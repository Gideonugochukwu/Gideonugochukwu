"use client";

import { useEffect, useRef, useState } from "react";
import type * as ThreeNS from "three";
import {
  CONTINENT_LOGOS,
  CONTINENT_LOGOS_ENABLED,
  CONTINENT_MAPS_ENABLED,
  type ContinentLogo,
} from "@/lib/continents";
import { ContinentLogoSvg, ContinentMapSvg } from "./ContinentLogos";

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
 * - Continent overlays: either geographic map outlines (default) or the
 *   animal logo marks (PR #38) — one layer at a time, chosen via the CMS
 *   toggles. Anchored to continent centroids on the sphere and rendered as
 *   DOM overlays projected to screen space each frame — always camera-facing
 *   and upright, fading out as they rotate onto the globe's dark side. Map
 *   outlines carry a Fraunces label beneath them; labels that would collide
 *   on a globe turn are suppressed. Hovering an overlay pauses the rotation
 *   and zooms it 30%. Hover is detected geometrically (cursor vs. projected
 *   rect), so the hero text layered above the globe never blocks it, and the
 *   overlays stay pointer-events-none and can never intercept CTA clicks.
 * - Mobile (< 768px): a lightweight static SVG globe — no canvas, no WebGL.
 *   The overlays render as a row below the headline instead (see
 *   ContinentLogoRow, slotted in by the homepage hero).
 * - prefers-reduced-motion: the globe renders once and then holds still (no
 *   rotation, no pulsing, no parallax; breathing is disabled in CSS).
 *
 * Purely decorative and behind the hero text: aria-hidden + pointer-events-none.
 */
export default function HeroGlobe({
  data = CONTINENT_LOGOS,
  mapsEnabled = CONTINENT_MAPS_ENABLED,
  logosEnabled = CONTINENT_LOGOS_ENABLED,
}: {
  /** CMS-swappable continent data — map outlines + animal marks + anchors. */
  data?: ContinentLogo[];
  /** CMS toggle: render geographic map outlines (with labels). */
  mapsEnabled?: boolean;
  /** CMS toggle: render the animal logo marks instead / as well. */
  logosEnabled?: boolean;
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [reduced, setReduced] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoEls = useRef<(HTMLDivElement | null)[]>([]);
  const labelEls = useRef<(HTMLSpanElement | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0, cx: -1e4, cy: -1e4 });

  // One overlay item per continent per enabled layer. Default is maps-only;
  // enabling both stacks a map and a mark on the same anchor (documented as
  // "one at a time" in lib/continents.ts).
  const items: { d: ContinentLogo; kind: "map" | "logo" }[] = [
    ...(mapsEnabled ? data.map((d) => ({ d, kind: "map" as const })) : []),
    ...(logosEnabled ? data.map((d) => ({ d, kind: "logo" as const })) : []),
  ];
  const showOverlay = items.length > 0;

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

  // Track cursor for parallax + logo hover (viewport px and -1..1).
  useEffect(() => {
    if (!isDesktop || reduced) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.current.cx = e.clientX;
      pointer.current.cy = e.clientY;
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
      cleanup = initGlobe(THREE, mount, pointer, reduced, {
        anchors: showOverlay ? items.map((it) => it.d) : [],
        hasLabel: items.map((it) => it.kind === "map"),
        els: logoEls,
        labelEls,
        overlay: overlayRef,
      });
    })();

    return () => {
      disposed = true;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop, reduced, data, mapsEnabled, logosEnabled]);

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
        <>
          <div ref={mountRef} className="absolute inset-0" />
          {showOverlay && (
            <div ref={overlayRef} className="absolute inset-0 text-white">
              {items.map((it, i) => (
                <div
                  key={`${it.kind}-${it.d.key}`}
                  ref={(el) => {
                    logoEls.current[i] = el;
                  }}
                  className="ga-cl-anchor"
                  style={{ opacity: 0 }}
                >
                  <div
                    className="ga-cl-breathe"
                    style={{
                      animationDuration: `${3.4 + i * 0.45}s`,
                      animationDelay: `${-(i * 1.1)}s`,
                    }}
                  >
                    <div className="ga-cl-inner">
                      {it.kind === "map" ? (
                        <ContinentMapSvg logo={it.d} className="ga-cl-svg" />
                      ) : (
                        <ContinentLogoSvg logo={it.d} className="ga-cl-svg" />
                      )}
                    </div>
                  </div>
                  {it.kind === "map" && (
                    <span
                      ref={(el) => {
                        labelEls.current[i] = el;
                      }}
                      className="ga-cl-label"
                    >
                      {it.d.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
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

type PointerRef = React.RefObject<{ x: number; y: number; cx: number; cy: number }>;

type LogoLayer = {
  anchors: { lat: number; lon: number }[];
  hasLabel: boolean[];
  els: React.RefObject<(HTMLDivElement | null)[]>;
  labelEls: React.RefObject<(HTMLSpanElement | null)[]>;
  overlay: React.RefObject<HTMLDivElement | null>;
};

/**
 * Builds the Three.js globe inside `mount`. Returns a cleanup function that
 * stops the loop, removes listeners, and disposes all GPU resources.
 */
function initGlobe(
  THREE: typeof ThreeNS,
  mount: HTMLDivElement,
  pointer: PointerRef,
  reduced: boolean,
  logoLayer: LogoLayer
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

  // --- Continent logo anchors ----------------------------------------------
  // lat/lon → unit direction in the globe's local space (standard sphere
  // mapping). Marks sit just above the dot shell so they lead the limb fade.
  const logoLocals = logoLayer.anchors.map(({ lat, lon }) => {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lon + 180) * Math.PI) / 180;
    return new THREE.Vector3(
      -Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta)
    ).multiplyScalar(RADIUS * 1.04);
  });
  const worldV = new THREE.Vector3();
  const ndcV = new THREE.Vector3();
  const toCamV = new THREE.Vector3();
  let logoSize = 44;
  let hoveredLogo = -1;
  let spinSpeed = 1;

  const setLogoSize = (w: number, h: number) => {
    // Globe pixel diameter from the camera frustum; marks cap at 10% of it.
    const halfWorld = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const pxDiameter = (RADIUS / halfWorld) * h;
    logoSize = Math.max(24, Math.min(0.1 * pxDiameter, 64));
    logoLayer.overlay.current?.style.setProperty("--ga-cl-h", `${logoSize.toFixed(1)}px`);
    void w;
  };
  setLogoSize(width, height);

  // Screen-space state per overlay, reused each frame for label de-collision.
  const scr = logoLocals.map(() => ({ x: 0, y: 0, o: 0 }));

  const placeLogos = () => {
    const els = logoLayer.els.current;
    if (!els || logoLocals.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const mx = pointer.current.cx - rect.left;
    const my = pointer.current.cy - rect.top;
    let nextHover = -1;

    for (let i = 0; i < logoLocals.length; i++) {
      const el = els[i];
      if (!el) continue;
      worldV.copy(logoLocals[i]);
      group.localToWorld(worldV);

      // Front-side check: the mark's outward normal vs. the camera ray.
      toCamV.copy(camera.position).sub(worldV).normalize();
      const facing = worldV.clone().normalize().dot(toCamV);
      const opacity = Math.min(Math.max((facing - 0.08) / 0.3, 0), 1);

      ndcV.copy(worldV).project(camera);
      const sx = (ndcV.x * 0.5 + 0.5) * rect.width;
      const sy = (-ndcV.y * 0.5 + 0.5) * rect.height;

      el.style.opacity = opacity.toFixed(3);
      el.style.transform = `translate(-50%, -50%) translate(${sx.toFixed(1)}px, ${sy.toFixed(1)}px)`;
      scr[i].x = sx;
      scr[i].y = sy;
      scr[i].o = opacity;

      // Geometric hover: cursor inside the mark's projected box while it's
      // clearly on the light side.
      const half = logoSize * 0.62;
      if (
        opacity > 0.55 &&
        Math.abs(mx - sx) <= half &&
        Math.abs(my - sy) <= half
      ) {
        nextHover = i;
      }
    }

    // Label de-collision: walk labelled marks front-to-back (most opaque
    // first) and hide any whose label would overlap one already shown, so
    // adjacent continents don't stack their names on a globe turn.
    const labelEls = logoLayer.labelEls.current;
    if (labelEls) {
      const order = [];
      for (let i = 0; i < logoLocals.length; i++) {
        if (logoLayer.hasLabel[i] && labelEls[i]) order.push(i);
      }
      order.sort((a, b) => scr[b].o - scr[a].o);
      const shown: number[] = [];
      const minDX = Math.max(64, logoSize * 1.7); // widest label ≈ "North America"
      const minDY = logoSize * 0.95;
      for (const i of order) {
        const collide = shown.some(
          (j) =>
            Math.abs(scr[i].x - scr[j].x) < minDX &&
            Math.abs(scr[i].y - scr[j].y) < minDY
        );
        labelEls[i]!.style.opacity = collide ? "0" : "1";
        if (!collide) shown.push(i);
      }
    }

    if (nextHover !== hoveredLogo) {
      if (hoveredLogo >= 0) els[hoveredLogo]?.classList.remove("is-hovered");
      if (nextHover >= 0) els[nextHover]?.classList.add("is-hovered");
      hoveredLogo = nextHover;
    }
  };

  // --- Animation -----------------------------------------------------------
  const clock = new THREE.Clock();
  let raf = 0;
  const targetRot = { x: 0, y: 0 };

  const renderFrame = () => {
    const t = clock.getElapsedTime();

    // Slow continuous Y spin — eased to a halt while a logo is hovered.
    spinSpeed += ((hoveredLogo >= 0 ? 0 : 1) - spinSpeed) * 0.08;
    group.rotation.y += 0.0016 * spinSpeed;

    // Mouse parallax — ease group + camera toward the pointer.
    targetRot.x = pointer.current.y * 0.18;
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
    placeLogos();
  };

  const animate = () => {
    raf = requestAnimationFrame(animate);
    renderFrame();
  };

  if (reduced) {
    // Static single frame — no spin, no pulse, no parallax. Logos are
    // positioned once (and again on resize) with breathing disabled in CSS.
    renderFrame();
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
    setLogoSize(w, h);
    if (reduced) renderFrame();
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
