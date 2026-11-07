"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshTransmissionMaterial, Text, useFBO } from "@react-three/drei";
import * as THREE from "three";
import { lens as cfg } from "@/lib/motion";
import { colors } from "@/lib/colors";
import type { LensShared, TitleLayout } from "./shared";

const FONT = "/fonts/google-sans-500.ttf";
/** Fondo del hero (lo que la lente ve detrás del texto) y colores del lema. */
const BG = colors.corteza;
const LEAD = colors.white;
const ACCENT = colors.ceibo;
const LENS_Z = 0.6;
const CAMERA_Z = 10;

type Props = {
  layout: TitleLayout;
  shared: LensShared;
  mobile: boolean;
  onReady: () => void;
};

/**
 * 5.3 La lente 3D. Una lente biconvexa de vidrio (índice 1.5, el del CR-39)
 * refracta el lema. El lema se dibuja en 3D, calcado línea por línea del
 * <h1> real, pero solo dentro de un buffer que lee la lente: fuera de ella
 * el canvas es transparente y se ve el título HTML, nítido a cualquier DPR.
 * Se carga aparte (three.js no entra en el bundle inicial).
 */
export default function LensScene({ layout, shared, mobile, onReady }: Props) {
  return (
    <Canvas
      aria-hidden="true"
      dpr={mobile ? [1, 1.5] : [1, 2]}
      frameloop="always"
      flat
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, CAMERA_Z], fov: 35 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <PauseOffscreen shared={shared} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 6]} intensity={1.4} />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.5} position={[0, 4, 4]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[-5, -2, 3]} rotation-y={Math.PI / 3} scale={[4, 4, 1]} />
        <Lightformer form="ring" color={colors.ceibo} intensity={1} position={[5, -1, 2]} scale={2} />
      </Environment>
      <Lens shared={shared} mobile={mobile} layout={layout} onReady={onReady} />
    </Canvas>
  );
}

/** Con el hero fuera de pantalla, no se gasta GPU. */
function PauseOffscreen({ shared }: { shared: LensShared }) {
  const set = useThree((s) => s.set);
  useEffect(() => {
    let visible = true;
    const id = window.setInterval(() => {
      if (shared.visible !== visible) {
        visible = shared.visible;
        set({ frameloop: visible ? "always" : "never" });
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [set, shared]);
  return null;
}

/** El lema en 3D, en el mismo lugar y tamaño que el texto HTML. */
function Title({ layout, onReady }: { layout: TitleLayout; onReady: () => void }) {
  const { size, viewport } = useThree();
  const f = viewport.width / size.width;
  const pending = useRef(0);
  const readyFired = useRef(false);
  pending.current = layout.lines.length;

  return (
    <>
      {layout.lines.map((line, i) => (
        <Text
          key={`${i}-${line.text}-${layout.fontSize}`}
          font={FONT}
          fontSize={layout.fontSize * f}
          letterSpacing={-0.035}
          anchorX="left"
          anchorY="top-baseline"
          position={[(line.x - size.width / 2) * f, (size.height / 2 - line.baseline) * f, 0]}
          color={line.accent ? ACCENT : LEAD}
          onSync={() => {
            pending.current -= 1;
            if (pending.current <= 0 && !readyFired.current) {
              readyFired.current = true;
              requestAnimationFrame(onReady);
            }
          }}
        >
          {line.text}
        </Text>
      ))}
    </>
  );
}

/** Lente biconvexa: esfera aplanada en Z, con un aro fino blanco como montura. */
function Lens({ shared, mobile, layout, onReady }: { shared: LensShared; mobile: boolean; layout: TitleLayout; onReady: () => void }) {
  const group = useRef<THREE.Group>(null);
  const glass = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshPhysicalMaterial & { ior: number; thickness: number }>(null);
  const { size, camera, viewport, gl } = useThree();
  const current = useRef({ ior: cfg.ior, rx: 0, ry: 0 });

  // El título vive en su propia escena, que se renderiza a un buffer.
  const titleScene = useMemo(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG);
    return scene;
  }, []);
  const dpr = Math.min(gl.getPixelRatio(), mobile ? 1.5 : 2);
  const buffer = useFBO(Math.round(size.width * dpr), Math.round(size.height * dpr));

  useFrame((state) => {
    state.gl.setRenderTarget(buffer);
    state.gl.render(titleScene, state.camera);
    state.gl.setRenderTarget(null);
  });

  useFrame((_, dt) => {
    if (!group.current || !glass.current) return;
    const vp = viewport.getCurrentViewport(camera, new THREE.Vector3(0, 0, LENS_Z));
    const f = vp.width / size.width;
    const k = 1 - Math.pow(1 - 0.12, dt * 60);
    const s = current.current;

    group.current.position.set((shared.x - size.width / 2) * f, (size.height / 2 - shared.y) * f, LENS_Z);

    // Se inclina levemente hacia donde se mueve.
    const tiltY = THREE.MathUtils.clamp(shared.vx * 0.0006, -0.35, 0.35);
    const tiltX = THREE.MathUtils.clamp(shared.vy * 0.0006, -0.35, 0.35);
    s.ry += (tiltY - s.ry) * k;
    s.rx += (tiltX - s.rx) * k;
    group.current.rotation.set(s.rx, s.ry, 0);

    // Más índice, lente más fina (como una lente real de la misma potencia).
    s.ior += (shared.index - s.ior) * k * 0.6;
    const thin = (cfg.ior - 1) / (s.ior - 1);
    const r = shared.radius * f;
    glass.current.scale.set(r, r, r * 0.25 * thin);
    ring.current?.scale.set(r, r, r);
    if (material.current) {
      material.current.ior = s.ior;
      material.current.thickness = cfg.thickness * thin;
    }
  });

  return (
    <>
    {createPortal(<Title layout={layout} onReady={onReady} />, titleScene)}
    <group ref={group}>
      <mesh ref={glass}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          ref={material as never}
          ior={cfg.ior}
          thickness={cfg.thickness}
          roughness={0}
          chromaticAberration={cfg.chromaticAberration}
          distortion={cfg.distortion}
          distortionScale={0.4}
          temporalDistortion={0}
          buffer={buffer.texture}
          samples={mobile ? 4 : 6}
          transmission={1}
          anisotropicBlur={0.05}
        />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[1, 0.012, 12, 128]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.55} />
      </mesh>
    </group>
    </>
  );
}
