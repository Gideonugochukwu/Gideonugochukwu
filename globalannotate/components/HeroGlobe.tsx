"use client";

import { useEffect, useRef, useState } from "react";
import type * as ThreeNS from "three";

// Brand palette
const EMERALD = 0x10b981;
const TEAL = 0x14b8a6;

/**
 * Interactive 3D globe for the homepage hero background.
 *
 * - Desktop (>= 768px): a slowly rotating wireframe + dotted-point sphere built
 *   with raw Three.js. Emerald/teal points, glowing markers that pulse, and a
 *   subtle mouse-parallax tilt. Three.js is dynamically imported inside the
 *   effect so it lands in its own chunk and never blocks first paint / LCP.
 * - Mobile (< 768px): a lightweight static SVG globe — no canvas, no WebGL.
 * - prefers-reduced-motion: the globe renders once and then holds still (no
 *   rotation, no pulsing, no parallax).
 *
 * Purely decorative and behind the hero text: aria-hidden + pointer-events-none.
 */
export default function HeroGlobe() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [reduced, setReduced] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  // Resolve environment (viewport width + motion preference) after mount.
  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 768px)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsDesktop(mqDesktop.matches);
    setReduced(mqReduce.matches);

    const onDesktop = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    const onReduce = (e: MediaQueryListEvent) => setReduced(e.matches);
    mqDesktop.addEventListener("change", onDesktop);
    mqReduce.addEventListener("change", onReduce);
    return () => {
      mqDesktop.removeEventListener("change", onDesktop);
      mqReduce.removeEventListener("change", onReduce);
    };
  }, []);

  // Track cursor for parallax (relative to viewport centre, -1..1).
  useEffect(() => {
    if (!isDesktop || reduced) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [isDesktop, reduced]);

  // Build / tear down the Three.js scene.
  useEffect(() => {
    if (!isDesktop) return;
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed || !mountRef.current) return;
      cleanup = initGlobe(THREE, mount, pointer, reduced);
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [isDesktop, reduced]);

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Soft brand glow behind the globe on every device. */}
      <div
        className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(16,185,129,0.18), rgba(20,184,166,0.06) 55%, transparent 75%)",
        }}
      />
      {!isDesktop && <StaticGlobe />}
      {isDesktop && (
        <div ref={mountRef} className="absolute inset-0" />
      )}
    </div>
  );
}

/**
 * Lightweight static SVG globe used on mobile and during SSR. No animation,
 * no canvas — just meridians / parallels in the brand emerald at low opacity.
 */
function StaticGlobe() {
  return (
    <svg
      className="absolute left-1/2 top-1/2 h-[125%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.55]"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
          <stop offset="70%" stopColor="#14B8A6" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(#globeGlow)" />
      <circle cx="200" cy="200" r="150" stroke="#10B981" strokeOpacity="0.5" />
      {/* Parallels */}
      {[-110, -60, 0, 60, 110].map((oy) => (
        <ellipse
          key={`p${oy}`}
          cx="200"
          cy={200 + oy}
          rx={Math.sqrt(Math.max(0, 150 * 150 - oy * oy))}
          ry={16}
          stroke="#10B981"
          strokeOpacity="0.28"
        />
      ))}
      {/* Meridians */}
      {[150, 105, 55].map((rx, i) => (
        <ellipse
          key={`m${i}`}
          cx="200"
          cy="200"
          rx={rx}
          ry="150"
          stroke="#14B8A6"
          strokeOpacity="0.22"
        />
      ))}
      <line x1="200" y1="50" x2="200" y2="350" stroke="#14B8A6" strokeOpacity="0.22" />
      {/* A few glowing reach markers */}
      {[
        [150, 120],
        [268, 165],
        [180, 250],
        [235, 285],
        [120, 205],
      ].map(([cx, cy], i) => (
        <circle key={`d${i}`} cx={cx} cy={cy} r="3.5" fill="#34D399" fillOpacity="0.9" />
      ))}
    </svg>
  );
}

type PointerRef = React.RefObject<{ x: number; y: number }>;

/**
 * Builds the Three.js globe inside `mount`. Returns a cleanup function that
 * stops the loop, removes listeners, and disposes all GPU resources.
 */
function initGlobe(
  THREE: typeof ThreeNS,
  mount: HTMLDivElement,
  pointer: PointerRef,
  reduced: boolean
): () => void {
  const width = mount.clientWidth || window.innerWidth;
  const height = mount.clientHeight || 600;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height, false);
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  mount.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 4.4);

  const RADIUS = 1.55;
  const group = new THREE.Group();
  // Tilt the axis a touch so rotation reads as a real globe.
  group.rotation.z = 0.35;
  scene.add(group);

  // Track everything disposable.
  const disposables: Array<{ dispose: () => void }> = [];

  // --- Wireframe shell -----------------------------------------------------
  const wireGeo = new THREE.IcosahedronGeometry(RADIUS, 4);
  const wireMat = new THREE.MeshBasicMaterial({
    color: EMERALD,
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  });
  const wire = new THREE.Mesh(wireGeo, wireMat);
  group.add(wire);
  disposables.push(wireGeo, wireMat);

  // --- Dotted points across the surface (fibonacci sphere) -----------------
  const COUNT = 1600;
  const positions = new Float32Array(COUNT * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r * RADIUS;
    positions[i * 3 + 1] = y * RADIUS;
    positions[i * 3 + 2] = Math.sin(theta) * r * RADIUS;
  }
  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const dotTexture = makeDotTexture(THREE);
  const dotMat = new THREE.PointsMaterial({
    color: EMERALD,
    size: 0.032,
    map: dotTexture,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const dots = new THREE.Points(dotGeo, dotMat);
  group.add(dots);
  disposables.push(dotGeo, dotMat, dotTexture);

  // --- Glowing reach markers (pulsing sprites) -----------------------------
  const MARKERS = 16;
  const markerTexture = makeDotTexture(THREE, true);
  const markers: ThreeNS.Sprite[] = [];
  const markerPhase: number[] = [];
  const markerMats: ThreeNS.SpriteMaterial[] = [];
  for (let i = 0; i < MARKERS; i++) {
    const idx = Math.floor((i / MARKERS) * COUNT + Math.random() * 40);
    const px = positions[idx * 3];
    const py = positions[idx * 3 + 1];
    const pz = positions[idx * 3 + 2];
    const mat = new THREE.SpriteMaterial({
      map: markerTexture,
      color: i % 3 === 0 ? TEAL : EMERALD,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const sprite = new THREE.Sprite(mat);
    sprite.position.set(px * 1.02, py * 1.02, pz * 1.02);
    const base = 0.12 + Math.random() * 0.06;
    sprite.scale.set(base, base, base);
    sprite.userData.base = base;
    group.add(sprite);
    markers.push(sprite);
    markerMats.push(mat);
    markerPhase.push(Math.random() * Math.PI * 2);
  }
  disposables.push(markerTexture);

  // --- Animation -----------------------------------------------------------
  const clock = new THREE.Clock();
  let raf = 0;
  const targetRot = { x: 0, y: 0 };

  const renderFrame = () => {
    const t = clock.getElapsedTime();

    // Slow continuous Y spin.
    group.rotation.y += 0.0016;

    // Mouse parallax — ease group + camera toward the pointer.
    targetRot.x = pointer.current.y * 0.18;
    targetRot.y = pointer.current.x * 0.28;
    group.rotation.x += (targetRot.x - group.rotation.x) * 0.05;
    camera.position.x += (pointer.current.x * 0.35 - camera.position.x) * 0.05;
    camera.position.y += (-pointer.current.y * 0.25 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    // Gentle pulse on the markers.
    for (let i = 0; i < markers.length; i++) {
      const base = markers[i].userData.base as number;
      const s = base * (1 + 0.32 * Math.sin(t * 1.8 + markerPhase[i]));
      markers[i].scale.set(s, s, s);
      markerMats[i].opacity = 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(t * 1.8 + markerPhase[i]));
    }

    renderer.render(scene, camera);
  };

  const animate = () => {
    raf = requestAnimationFrame(animate);
    renderFrame();
  };

  if (reduced) {
    // Static single frame — no spin, no pulse, no parallax.
    renderer.render(scene, camera);
  } else {
    animate();
  }

  // --- Resize --------------------------------------------------------------
  const onResize = () => {
    const w = mount.clientWidth || window.innerWidth;
    const h = mount.clientHeight || 600;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    if (reduced) renderer.render(scene, camera);
  };
  const ro = new ResizeObserver(onResize);
  ro.observe(mount);

  // --- Cleanup -------------------------------------------------------------
  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    for (const mat of markerMats) mat.dispose();
    for (const d of disposables) d.dispose();
    renderer.dispose();
    if (canvas.parentNode === mount) mount.removeChild(canvas);
  };
}

/**
 * Builds a small round soft-edged sprite texture for dots / markers.
 * `hot` gives a brighter core for the pulsing markers.
 */
function makeDotTexture(THREE: typeof ThreeNS, hot = false): ThreeNS.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  if (hot) {
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.25, "rgba(209,250,229,0.95)");
    g.addColorStop(0.6, "rgba(16,185,129,0.35)");
    g.addColorStop(1, "rgba(16,185,129,0)");
  } else {
    g.addColorStop(0, "rgba(255,255,255,0.95)");
    g.addColorStop(0.5, "rgba(255,255,255,0.5)");
    g.addColorStop(1, "rgba(255,255,255,0)");
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
