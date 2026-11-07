"use client";

import { Component, useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { lens } from "@/lib/motion";
import { prefersReducedMotion } from "@/lib/load-gsap";
import { measureTitle, type LensShared, type TitleLayout } from "./shared";

type SceneProps = { layout: TitleLayout; shared: LensShared; mobile: boolean; onReady: () => void };
type Mode = "off" | "dom" | "3d";

/** Lupa DOM: aumento según el índice elegido (1.50 → ×1.15). */
const magnification = (n: number) => lens.magnifier.scale + (n - lens.ior) * 0.83;

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function isSlowDevice() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (nav.deviceMemory ?? 8) < 4 || (navigator.hardwareConcurrency ?? 8) < 4;
}

/**
 * 5.3 La lente del hero.
 * - Arranca como lupa DOM (barata, sin dependencias) y, si el dispositivo
 *   puede, pasa a la lente 3D, que se carga aparte. En desktop el 3D se pide
 *   cuando el navegador está libre; en mobile, con la primera interacción.
 * - La lente sigue al puntero con amortiguación; quieta, flota en un 8.
 *   En mobile se puede arrastrar con el dedo.
 * - Con prefers-reduced-motion no hay lente: el hero queda estático.
 */
export function HeroLens({ lead, accent }: { lead: string; accent: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const domLensRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("off");
  const [layout, setLayout] = useState<TitleLayout | null>(null);
  const [Scene, setScene] = useState<ComponentType<SceneProps> | null>(null);
  const [mobile, setMobile] = useState(false);
  const shared = useRef<LensShared>({ x: 0, y: 0, vx: 0, vy: 0, radius: 120, index: lens.ior, visible: true }).current;

  const section = () => rootRef.current?.closest("section") as HTMLElement | null;

  // Medidas del título (para la copia de la lupa y el texto 3D).
  const remeasure = useCallback(() => {
    const sec = section();
    const h1 = sec?.querySelector<HTMLElement>("#hero-title");
    if (!sec || !h1) return;
    const sRect = sec.getBoundingClientRect();
    const hRect = h1.getBoundingClientRect();
    const clone = cloneRef.current;
    if (clone) {
      clone.style.left = `${hRect.left - sRect.left}px`;
      clone.style.top = `${hRect.top - sRect.top}px`;
      clone.style.width = `${hRect.width}px`;
    }
    shared.radius = Math.min(sRect.width, sRect.height) * (sRect.width < 1024 ? 0.24 : 0.17);
    setLayout(measureTitle(h1, sec));
  }, [shared]);

  // Decide el modo y cuándo cargar el 3D.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const sec = section();
    const h1 = sec?.querySelector<HTMLElement>("#hero-title");
    if (!sec || !h1) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const stand = document.documentElement.dataset.stand === "1";
    setMobile(coarse || sec.getBoundingClientRect().width < 1024);

    let cancelled = false;
    const cleanups: (() => void)[] = [];

    // Esperar a que termine la entrada del hero para medir posiciones finales.
    Promise.all(h1.getAnimations().map((a) => a.finished.catch(() => undefined))).then(() => {
      if (cancelled) return;
      remeasure();
      setMode("dom");
      if (!hasWebGL() || isSlowDevice()) return;

      const load = () => {
        if (cancelled) return;
        import("./LensScene").then((m) => !cancelled && setScene(() => m.default));
      };
      if (coarse && !stand) {
        const events = ["pointerdown", "touchstart", "scroll", "keydown"] as const;
        const once = () => {
          events.forEach((e) => window.removeEventListener(e, once));
          window.clearTimeout(timer);
          load();
        };
        events.forEach((e) => window.addEventListener(e, once, { passive: true, once: true }));
        const timer = window.setTimeout(once, 6000);
        cleanups.push(() => {
          events.forEach((e) => window.removeEventListener(e, once));
          window.clearTimeout(timer);
        });
      } else {
        const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
        const id = ric(load, { timeout: 2500 });
        cleanups.push(() => (window.cancelIdleCallback ?? window.clearTimeout)(id as number));
      }
    });

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(remeasure, 150);
    };
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(() => !cancelled && remeasure());
    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
    };
  }, [remeasure]);

  // Movimiento: sigue al puntero, flota en un 8 o se arrastra con el dedo.
  useEffect(() => {
    if (mode === "off") return;
    const sec = section();
    const h1 = sec?.querySelector<HTMLElement>("#hero-title");
    if (!sec || !h1) return;
    const stand = document.documentElement.dataset.stand === "1";

    const pointer = { x: 0, y: 0, last: -Infinity, inside: false, overUi: false };
    let dragging = false;
    let t = 0;
    let prev = performance.now();
    let frame = 0;
    let scale = magnification(shared.index);
    let shrink = 1;

    // Arranca sobre el título.
    const start = () => {
      const s = sec.getBoundingClientRect();
      const h = h1.getBoundingClientRect();
      return { cx: h.left - s.left + h.width * 0.55, cy: h.top - s.top + h.height * 0.5, hw: h.width, hh: h.height, s };
    };
    const first = start();
    shared.x = first.cx;
    shared.y = first.cy;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || stand) return;
      const r = sec.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.inside = pointer.y >= 0 && pointer.y <= r.height;
      pointer.overUi = !!(e.target as Element | null)?.closest?.("a, button");
      pointer.last = performance.now();
    };
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const r = sec.getBoundingClientRect();
      const x = touch.clientX - r.left;
      const y = touch.clientY - r.top;
      if (Math.hypot(x - shared.x, y - shared.y) <= shared.radius * 1.1) {
        dragging = true;
        pointer.x = x;
        pointer.y = y;
        pointer.last = performance.now();
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      const r = sec.getBoundingClientRect();
      pointer.x = touch.clientX - r.left;
      pointer.y = touch.clientY - r.top;
      pointer.last = performance.now();
    };
    const onTouchEnd = () => {
      dragging = false;
      pointer.last = performance.now();
    };

    const io = new IntersectionObserver(([entry]) => (shared.visible = entry.isIntersecting));
    io.observe(sec);

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!shared.visible) return;
      t += dt;

      const g = start();
      const following = (pointer.inside && now - pointer.last < 3000) || dragging || now - pointer.last < 2000;
      let tx: number;
      let ty: number;
      if (following && pointer.last > 0) {
        tx = pointer.x;
        ty = pointer.y;
      } else {
        // Trayectoria lenta en forma de 8 (lemniscata) sobre el título.
        const ax = Math.min(g.hw * 0.32, g.s.width * 0.3);
        const ay = g.hh * 0.32;
        tx = g.cx + ax * Math.sin(t * 0.35);
        ty = g.cy + ay * Math.sin(t * 0.7);
      }
      const k = 1 - Math.pow(1 - lens.damp, dt * 60);
      const nx = shared.x + (tx - shared.x) * k;
      const ny = shared.y + (ty - shared.y) * k;
      shared.vx = (nx - shared.x) / Math.max(dt, 1e-3);
      shared.vy = (ny - shared.y) / Math.max(dt, 1e-3);
      shared.x = nx;
      shared.y = ny;

      // Lupa DOM: círculo recortado con una copia del título aumentada.
      const lensEl = domLensRef.current;
      const clone = cloneRef.current;
      const ring = ringRef.current;
      if (lensEl && clone && ring) {
        scale += (magnification(shared.index) - scale) * k;
        shrink += ((pointer.overUi && following ? 0 : 1) - shrink) * k;
        const r = shared.radius * shrink;
        lensEl.style.clipPath = `circle(${r}px at ${nx}px ${ny}px)`;
        const ox = nx - parseFloat(clone.style.left || "0");
        const oy = ny - parseFloat(clone.style.top || "0");
        clone.style.transformOrigin = `${ox}px ${oy}px`;
        clone.style.transform = `scale(${scale})`;
        ring.style.transform = `translate(${nx - r}px, ${ny - r}px)`;
        ring.style.width = ring.style.height = `${r * 2}px`;
      }
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    sec.addEventListener("touchstart", onTouchStart, { passive: true });
    sec.addEventListener("touchmove", onTouchMove, { passive: false });
    sec.addEventListener("touchend", onTouchEnd);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      sec.removeEventListener("touchstart", onTouchStart);
      sec.removeEventListener("touchmove", onTouchMove);
      sec.removeEventListener("touchend", onTouchEnd);
    };
  }, [mode, shared]);

  // El modo se refleja en la sección (CSS hace los fundidos) y se vuelve a medir.
  useEffect(() => {
    const sec = section();
    if (sec) sec.dataset.lens = mode;
    if (mode !== "off") requestAnimationFrame(remeasure);
  }, [mode, remeasure]);

  return (
    <div ref={rootRef} aria-hidden="true" className="contents">
      {/* Lente 3D: el canvas es transparente salvo la lente, encima del título */}
      <div className="hero-canvas pointer-events-none absolute inset-0 z-[2]">
        {Scene && layout && (
          <SceneBoundary onError={() => setScene(null)}>
            <Scene layout={layout} shared={shared} mobile={mobile} onReady={() => setMode("3d")} />
          </SceneBoundary>
        )}
      </div>

      {/* Lupa DOM, entre el título y el resto del contenido */}
      <div ref={domLensRef} className="dom-lens pointer-events-none absolute inset-0 z-[2] bg-ceibo" style={{ clipPath: "circle(0px at 0 0)" }}>
        <div ref={cloneRef} className="absolute text-display font-medium text-balance text-white">
          <span className="block">{lead}</span> <span className="block text-ink">{accent}</span>
        </div>
      </div>
      <div
        ref={ringRef}
        className="dom-lens pointer-events-none absolute top-0 left-0 z-[2] rounded-full border border-white/50 shadow-[inset_0_0_24px_rgb(255_255_255/0.18),0_0_40px_rgb(42_16_19/0.25)]"
      />
    </div>
  );
}

/** Si WebGL falla, se vuelve a la lupa DOM sin romper la página. */
class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
