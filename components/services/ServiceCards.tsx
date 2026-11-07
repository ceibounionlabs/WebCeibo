"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { services } from "@/lib/content";
import { cursorFollow, serviceZoom as zoom } from "@/lib/motion";
import { loadGsap, prefersReducedMotion, type GsapModule } from "@/lib/load-gsap";
import { getLenis, scrollToHash } from "@/lib/scroll";
import { focusables, setPageInert, setUiFlag, trapFocus } from "@/lib/ui-flags";
import { useMedia } from "@/lib/use-media";
import { BtnArrow } from "@/components/ui/icons";
import { ServiceDetail } from "./ServiceDetail";

const cards = services.cards;
const total = cards.length;
const HASH = "#servicio-";
const indexFromHash = (hash: string) => (hash.startsWith(HASH) ? cards.findIndex((c) => c.slug === hash.slice(HASH.length)) : -1);
const num = (i: number) => String(i + 1).padStart(2, "0");

type Open = { index: number; via: "zoom" | "fade"; from: number };

/**
 * Qué hacemos (B3, B4, B3b).
 * - Desktop: fila de 4 tarjetas; la activa crece (hover, foco o click), su
 *   número sube y aparecen el texto y el botón "Ver más +", que sigue al cursor.
 * - Mobile: acordeón, una abierta a la vez, con "Ver detalle".
 * - El detalle se abre con un zoom de elemento compartido (Flip): la tarjeta
 *   crece hasta ocupar la pantalla. Tiene URL propia (#servicio-…), el botón
 *   atrás lo cierra y entrar con el hash lo abre directo.
 */
export function ServiceCards() {
  const desktop = useMedia("(min-width: 64rem)", true);
  const finePointer = useMedia("(hover: hover) and (pointer: fine)");
  const [active, setActive] = useState<number | null>(0);
  const [open, setOpen] = useState<Open | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<GsapModule | null>(null);
  const startRects = useRef<{ bg: ReturnType<GsapModule["Flip"]["getState"]>; num: DOMRect; title: DOMRect; numFs: number; titleFs: number } | null>(null);
  const pushed = useRef(false);
  const busy = useRef(false);
  const openRef = useRef<Open | null>(null);
  openRef.current = open;

  const shown = desktop ? (active ?? 0) : active;
  const card = (i: number) => {
    const li = listRef.current?.children[i] as HTMLElement | undefined;
    return {
      li,
      bg: li?.querySelector<HTMLElement>("[data-flip-id^='bg-']") ?? null,
      num: li?.querySelector<HTMLElement>("[data-card-num]") ?? null,
      title: li?.querySelector<HTMLElement>("[data-card-title]") ?? null,
      trigger: li?.querySelector<HTMLButtonElement>("button[aria-expanded]") ?? null,
    };
  };
  const backdrop = () => ["contenido", "pie"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

  // ---------- Abrir ----------
  const openDetail = useCallback(async (index: number, via: "zoom" | "fade", push: boolean) => {
    if (busy.current || openRef.current) return;
    busy.current = true;
    const reduced = prefersReducedMotion();
    if (!reduced) gsapRef.current = await loadGsap();
    if (via === "zoom" && gsapRef.current && !reduced) {
      const c = card(index);
      if (c.bg && c.num && c.title) {
        startRects.current = {
          bg: gsapRef.current.Flip.getState(c.bg, { props: "borderRadius" }),
          num: c.num.getBoundingClientRect(),
          title: c.title.getBoundingClientRect(),
          numFs: parseFloat(getComputedStyle(c.num).fontSize),
          titleFs: parseFloat(getComputedStyle(c.title).fontSize),
        };
      } else via = "fade";
    } else via = "fade";
    if (push) {
      history.pushState({ servicio: cards[index].slug }, "", `${location.pathname}${location.search}${HASH}${cards[index].slug}`);
      pushed.current = true;
    }
    setOpen({ index, via, from: index });
  }, []);

  // Animación de apertura, una vez montado el detalle.
  useLayoutEffect(() => {
    if (!open || !busy.current) return;
    const root = detailRef.current;
    const content = contentRef.current;
    if (!root || !content) return;

    setUiFlag("detail", true);
    setPageInert(true);
    const lenis = getLenis();
    if (lenis) lenis.stop();
    else document.documentElement.style.overflow = "hidden";
    card(open.index).li?.classList.add("is-zoomed");

    const done = () => {
      busy.current = false;
      root.querySelector<HTMLElement>("[data-detail-close]")?.focus({ preventScroll: true });
    };
    const g = gsapRef.current;
    if (!g) {
      root.classList.add("is-fading-in");
      window.setTimeout(done, zoom.reducedFade * 1000);
      return;
    }
    const { gsap, Flip } = g;
    if (open.via === "zoom" && startRects.current) {
      const s = startRects.current;
      const dBg = root.querySelector<HTMLElement>("[data-flip-id^='bg-']")!;
      const dNum = root.querySelector<HTMLElement>("[data-flip-id^='num-']")!;
      const dTitle = root.querySelector<HTMLElement>("[data-flip-id^='title-']")!;
      Flip.from(s.bg, { targets: dBg, duration: zoom.duration, ease: "lente", props: "borderRadius" });
      for (const [el, from, fs] of [
        [dNum, s.num, s.numFs],
        [dTitle, s.title, s.titleFs],
      ] as const) {
        const to = el.getBoundingClientRect();
        const scale = fs / parseFloat(getComputedStyle(el).fontSize);
        gsap.from(el, { x: from.left - to.left, y: from.top - to.top, scale, transformOrigin: "0 0", duration: zoom.duration, ease: "lente", clearProps: "transform" });
      }
      gsap.from(content.querySelectorAll("[data-detail-item]"), {
        filter: "blur(8px)",
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "lente",
        stagger: zoom.contentStagger,
        delay: zoom.contentDelay,
        clearProps: "filter,transform,opacity",
      });
      gsap.to(backdrop(), {
        ...zoom.backdrop,
        transformOrigin: `50% ${window.scrollY + window.innerHeight / 2}px`,
        duration: zoom.duration,
        ease: "lente",
        onComplete: done,
      });
    } else {
      gsap.from(root, { opacity: 0, duration: 0.4, ease: "power1.out", onComplete: done });
    }
  }, [open?.from]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---------- Cerrar ----------
  const finishClose = useCallback((index: number) => {
    setOpen(null);
    setUiFlag("detail", false);
    setPageInert(false);
    const lenis = getLenis();
    if (lenis) lenis.start();
    else document.documentElement.style.overflow = "";
    for (const li of Array.from(listRef.current?.children ?? [])) li.classList.remove("is-zoomed");
    busy.current = false;
    card(index).trigger?.focus({ preventScroll: true });
  }, []);

  const animateClose = useCallback(
    (then?: () => void) => {
      const current = openRef.current;
      const root = detailRef.current;
      if (!current || !root || busy.current) return;
      busy.current = true;
      const g = gsapRef.current;
      const end = () => {
        finishClose(current.index);
        then?.();
      };
      if (!g) {
        root.classList.add("is-fading-out");
        window.setTimeout(end, zoom.reducedFade * 1000);
        return;
      }
      const { gsap, Flip } = g;
      const c = card(current.index);
      const canZoom = current.via === "zoom" && current.index === current.from && c.bg && c.num && c.title;
      if (!canZoom) {
        gsap.to(backdrop(), { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.4, clearProps: "transform,filter,opacity" });
        gsap.to(root, { opacity: 0, duration: 0.35, ease: "power1.in", onComplete: end });
        return;
      }
      // La página está tapada por el detalle: se vuelve a escala 1 sin que se note y se mide la tarjeta.
      gsap.set(backdrop(), { scale: 1 });
      const dBg = root.querySelector<HTMLElement>("[data-flip-id^='bg-']")!;
      const dNum = root.querySelector<HTMLElement>("[data-flip-id^='num-']")!;
      const dTitle = root.querySelector<HTMLElement>("[data-flip-id^='title-']")!;
      gsap.to(contentRef.current!.querySelectorAll("[data-detail-item]"), { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power1.in" });
      Flip.fit(dBg, c.bg!, { duration: 0.8, ease: "lente", props: "borderRadius" });
      for (const [el, target] of [
        [dNum, c.num!],
        [dTitle, c.title!],
      ] as const) {
        const from = el.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        const scale = parseFloat(getComputedStyle(target).fontSize) / parseFloat(getComputedStyle(el).fontSize);
        gsap.to(el, { x: to.left - from.left, y: to.top - from.top, scale, transformOrigin: "0 0", duration: 0.8, ease: "lente" });
      }
      gsap.to(backdrop(), { filter: "blur(0px)", opacity: 1, duration: 0.8, ease: "lente", clearProps: "transform,filter,opacity", onComplete: end });
    },
    [finishClose],
  );

  /** Cierre pedido por la interfaz (×, Esc, "Volver a servicios"). */
  const requestClose = useCallback(
    (then?: () => void) => {
      if (pushed.current && !then) {
        // Hay una entrada propia en el historial: volver atrás (popstate cierra).
        pushed.current = false;
        history.back();
        return;
      }
      pushed.current = false;
      history.replaceState(history.state, "", `${location.pathname}${location.search}`);
      animateClose(then);
    },
    [animateClose],
  );

  // Botón atrás / adelante del navegador y links directos con el hash.
  useEffect(() => {
    const onPop = () => {
      const index = indexFromHash(location.hash);
      if (index === -1 && openRef.current) animateClose();
      else if (index !== -1 && !openRef.current) {
        pushed.current = true;
        openDetail(index, "fade", false);
      }
    };
    window.addEventListener("popstate", onPop);
    const initial = indexFromHash(location.hash);
    if (initial !== -1) openDetail(initial, "fade", false);
    return () => window.removeEventListener("popstate", onPop);
  }, [animateClose, openDetail]);

  // Esc y foco atrapado mientras el detalle está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
      else if (detailRef.current) trapFocus(event, focusables(detailRef.current));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, requestClose]);

  // Anterior / siguiente sin cerrar: fundido horizontal corto.
  const navigate = useCallback(
    (dir: -1 | 1) => {
      const current = openRef.current;
      if (!current || busy.current) return;
      const next = (current.index + dir + total) % total;
      const apply = () => {
        for (const li of Array.from(listRef.current?.children ?? [])) li.classList.remove("is-zoomed");
        card(next).li?.classList.add("is-zoomed");
        setActive(next);
        setOpen({ ...current, index: next });
        history.replaceState(history.state, "", `${location.pathname}${location.search}${HASH}${cards[next].slug}`);
      };
      const g = gsapRef.current;
      const content = contentRef.current;
      if (!g || !content) return apply();
      busy.current = true;
      g.gsap.to(content, {
        x: -dir * zoom.switchX,
        opacity: 0,
        duration: zoom.switchDuration * 0.5,
        ease: "power2.in",
        onComplete: () => {
          apply();
          requestAnimationFrame(() =>
            g.gsap.fromTo(content, { x: dir * zoom.switchX, opacity: 0 }, { x: 0, opacity: 1, duration: zoom.switchDuration, ease: "lente", clearProps: "transform,opacity", onComplete: () => (busy.current = false) }),
          );
        },
      });
    },
    [],
  );

  // B4: "Ver más +" sigue al cursor dentro de la tarjeta activa.
  useEffect(() => {
    if (!desktop || !finePointer || shown === null) return;
    const { li } = card(shown);
    const btn = li?.querySelector<HTMLElement>("[data-see-more]");
    if (!li || !btn) return;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      const r = li.getBoundingClientRect();
      const b = btn.offsetWidth;
      // Desplazamiento respecto de su lugar por defecto (abajo a la derecha).
      tx = e.clientX - r.left - b / 2 - (li.clientWidth - b - 32);
      ty = e.clientY - r.top - b / 2 - (li.clientHeight - b - 32);
      li.classList.add("is-hovering");
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      li.classList.remove("is-hovering");
    };
    const tick = () => {
      x += (tx - x) * cursorFollow.lerp;
      y += (ty - y) * cursorFollow.lerp;
      btn.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    li.addEventListener("pointermove", onMove);
    li.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      li.removeEventListener("pointermove", onMove);
      li.removeEventListener("pointerleave", onLeave);
      li.classList.remove("is-hovering");
      btn.style.translate = "";
    };
  }, [desktop, finePointer, shown]);

  function onTrigger(event: React.MouseEvent, i: number) {
    if (desktop) {
      const keyboard = event.detail === 0;
      if (shown === i && !keyboard) openDetail(i, "zoom", true);
      else setActive(i);
    } else {
      setActive(active === i ? null : i);
    }
  }

  return (
    <>
      <ul ref={listRef} className="service-list mt-14 lg:mt-20" data-reveal>
        {cards.map((c, i) => {
          const isActive = shown === i;
          return (
            <li
              key={c.slug}
              className={`service-card ${isActive ? "is-active" : ""}`}
              onPointerEnter={desktop && finePointer ? () => setActive(i) : undefined}
            >
              <span aria-hidden="true" data-flip-id={`bg-${c.slug}`} className="service-card-bg" />
              <h3 className="service-card-heading">
                <button
                  type="button"
                  id={`svc-btn-${c.slug}`}
                  aria-expanded={isActive}
                  aria-controls={`svc-panel-${c.slug}`}
                  onClick={(e) => onTrigger(e, i)}
                  onFocus={desktop ? () => setActive(i) : undefined}
                  className="service-card-trigger"
                >
                  <span data-card-title className="service-card-title">
                    {c.title}
                  </span>
                  <span aria-hidden="true" className="service-card-plus" />
                </button>
              </h3>
              <span aria-hidden="true" data-card-num className="service-card-number">
                {num(i)}
              </span>
              <div id={`svc-panel-${c.slug}`} role="region" aria-labelledby={`svc-btn-${c.slug}`} className="service-card-panel" inert={!isActive}>
                <div className="service-card-panel-inner">
                  <p className="service-card-body">{c.body}</p>
                  <button
                    type="button"
                    data-see-more
                    onClick={() => openDetail(i, "zoom", true)}
                    className="service-see-more group/btn"
                    aria-label={`${services.seeDetail}: ${c.title}`}
                  >
                    <span className="hidden lg:inline">{services.seeMore} +</span>
                    <span className="inline-flex items-center gap-2.5 lg:hidden">
                      {services.seeDetail}
                      <BtnArrow />
                    </span>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {open &&
        createPortal(
        <ServiceDetail
          service={cards[open.index]}
          index={open.index}
          total={total}
          rootRef={detailRef}
          contentRef={contentRef}
          onClose={() => requestClose()}
          onContact={() => requestClose(() => scrollToHash("#hablemos"))}
          onNavigate={navigate}
        />,
          document.body,
        )}
    </>
  );
}
