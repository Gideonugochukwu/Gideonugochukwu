"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type * as ThreeNS from "three";

// Brand palette
const NAVY = 0x0f172a;
const EMERALD = 0x10b981;
const TEAL = 0x14b8a6;

// Major world regions the glowing points pin to (lat, lon in degrees). The
// lat/lon → xyz mapping matches Three's SphereGeometry UVs, so points land on
// the right landmasses of the equirectangular texture.
const REGIONS: [number, number][] = [
  [40, -100], // North America
  [39, -77], //  US East
  [-15, -58], // South America
  [50, 8], //    Western Europe
  [9, 8], //     West Africa (Nigeria)
  [1, 37], //    East Africa
  [25, 45], //   Middle East
  [22, 78], //   India
  [3, 102], //   Southeast Asia
  [35, 112], //  East Asia
  [36, 139], //  Japan
  [-27, 133], // Australia
];

// Arcs travel between these region pairs (indices into REGIONS).
const ARCS: [number, number][] = [
  [4, 3], //  West Africa → Europe
  [4, 0], //  West Africa → North America
  [4, 2], //  West Africa → South America
  [3, 9], //  Europe → East Asia
  [7, 8], //  India → SE Asia
  [11, 8], // Australia → SE Asia
  [1, 3], //  US East → Europe
];

// Continent name labels, pinned to each landmass centroid (lat, lon).
const CONTINENTS: { name: string; lat: number; lon: number }[] = [
  { name: "North America", lat: 46, lon: -100 },
  { name: "South America", lat: -12, lon: -58 },
  { name: "Europe", lat: 52, lon: 15 },
  { name: "Africa", lat: 2, lon: 22 },
  { name: "Asia", lat: 44, lon: 90 },
  { name: "Australia", lat: -25, lon: 134 },
];

// Mobile static globe shows the Africa/Europe/Asia hemisphere. Label the two
// landmasses that sit clear of the (large) hero heading — Europe would fall
// behind the text, so it's omitted to keep things clean.
const MOBILE_LABELS: { name: string; top: string; left: string }[] = [
  { name: "Asia", top: "40%", left: "72%" },
  { name: "Africa", top: "56%", left: "58%" },
];

/**
 * Full, living world-map globe for the homepage hero background.
 *
 * - Desktop (>= 768px): a Three.js SphereGeometry wrapped in a complete
 *   equirectangular world map (public-domain Natural Earth land, brand-tinted
 *   — see /public/world-map.png). The globe feels alive: a slow floating
 *   drift + axis wobble so it hangs in space, ~12 emerald points pinned to
 *   world regions that softly pulse, and thin emerald/teal arcs with a bright
 *   signal travelling between regions. Slow auto-rotation; click-drag to spin
 *   via OrbitControls, auto-rotate resuming ~2s after release. A soft emerald
 *   atmosphere shell glows around the rim. Three.js, the controls, and the
 *   texture are dynamically imported so they never block first paint / LCP.
 * - Mobile (< 768px): a static 2D circular world-map image — no canvas, no
 *   WebGL — so the hero stays fast on phones.
 * - prefers-reduced-motion: the globe renders but nothing self-animates (no
 *   drift, pulse, arc travel, or auto-rotation; drag still works).
 *
 * Decorative and behind the hero text (the hero's dark gradient dims it for
 * legibility). The canvas accepts pointer events so the globe is draggable;
 * the hero content above it stays fully clickable.
 */
export default function HeroGlobe({
  textureSrc = "/world-map.png",
  mobileSrc = "/world-map-mobile.png",
}: {
  textureSrc?: string;
  mobileSrc?: string;
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [reduced, setReduced] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const labelEls = useRef<(HTMLSpanElement | null)[]>([]);

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

  useEffect(() => {
    if (!isDesktop) return;
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import(
        "three/examples/jsm/controls/OrbitControls.js"
      );
      if (disposed || !mountRef.current) return;
      cleanup = initGlobe(THREE, OrbitControls, mount, reduced, textureSrc, labelEls);
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [isDesktop, reduced, textureSrc]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Soft emerald glow behind the globe on every device. */}
      <div
        className="pointer-events-none absolute left-[62%] top-1/2 h-[130%] w-[95%] -translate-x-1/2 -translate-y-1/2 md:left-[68%]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(16,185,129,0.20), rgba(20,184,166,0.07) 55%, transparent 74%)",
        }}
      />
      {!isDesktop && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="relative aspect-square w-[112%] max-w-none translate-y-[1%] overflow-hidden rounded-full ring-1 ring-brand-500/20">
            <Image
              src={mobileSrc}
              alt="World map showing GlobalAnnotate's global reach"
              fill
              priority={false}
              sizes="140vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 38% 32%, rgba(255,255,255,0.10), transparent 42%), radial-gradient(circle at 50% 50%, transparent 55%, rgba(2,6,23,0.55) 82%, rgba(2,6,23,0.9) 100%)",
              }}
            />
            <div
              className="absolute inset-0 rounded-full ring-1 ring-inset"
              style={{ boxShadow: "inset 0 0 40px rgba(16,185,129,0.25)" }}
            />
            {/* A few clean labels over the visible landmasses. */}
            {MOBILE_LABELS.map((l) => (
              <span
                key={l.name}
                className="globe-label absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: l.top, left: l.left }}
              >
                {l.name}
              </span>
            ))}
          </div>
        </div>
      )}
      {isDesktop && (
        <>
          <div
            ref={mountRef}
            className="absolute inset-0 translate-x-[12%] lg:translate-x-[16%]"
          />
          {/* Continent labels — projected to screen space each frame by
              initGlobe so they pin to the surface, face the camera, stay
              upright, and fade out on the globe's back side. */}
          <div className="pointer-events-none absolute inset-0 translate-x-[12%] lg:translate-x-[16%]">
            {CONTINENTS.map((c, i) => (
              <span
                key={c.name}
                ref={(el) => {
                  labelEls.current[i] = el;
                }}
                className="globe-label absolute left-0 top-0"
                style={{ opacity: 0, willChange: "transform, opacity" }}
              >
                {c.name}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/** lat/lon (deg) → point on a sphere of radius r, matching Three's SphereGeometry UVs. */
function latLonToVec3(THREE: typeof ThreeNS, lat: number, lon: number, r: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.cos(theta) * Math.sin(phi),
    r * Math.cos(phi),
    r * Math.sin(theta) * Math.sin(phi)
  );
}

/**
 * Builds the living world-map globe inside `mount`. Returns a cleanup
 * function that stops the loop, removes listeners, and disposes all GPU
 * resources.
 */
function initGlobe(
  THREE: typeof ThreeNS,
  OrbitControls: typeof import("three/examples/jsm/controls/OrbitControls.js").OrbitControls,
  mount: HTMLDivElement,
  reduced: boolean,
  textureSrc: string,
  labelEls: React.RefObject<(HTMLSpanElement | null)[]>
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
  canvas.style.cursor = "grab";
  mount.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  camera.position.set(0, 0, 4.6);

  const RADIUS = 1.6;
  const group = new THREE.Group();
  group.rotation.z = 0.32; // gentle axial tilt
  // Scale the whole globe (sphere + arcs + points + atmosphere) so the full
  // sphere sits inside the hero on the right with a little more presence,
  // while the hero section's overflow-hidden keeps it from ever spilling out.
  group.scale.setScalar(0.72);
  scene.add(group);

  const disposables: Array<{ dispose: () => void }> = [];

  // --- Globe sphere (texture loaded lazily) --------------------------------
  const geo = new THREE.SphereGeometry(RADIUS, 96, 96);
  const material = new THREE.MeshStandardMaterial({
    color: NAVY,
    roughness: 0.95,
    metalness: 0.0,
    emissive: 0xffffff,
    emissiveIntensity: 0.32,
  });
  const globe = new THREE.Mesh(geo, material);
  group.add(globe);
  disposables.push(geo, material);

  const loader = new THREE.TextureLoader();
  loader.load(textureSrc, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    material.map = tex;
    material.emissiveMap = tex;
    material.color.set(0xffffff);
    material.needsUpdate = true;
    disposables.push(tex);
    renderOnce();
  });

  // --- Atmosphere rim glow (back-side shell) -------------------------------
  const atmGeo = new THREE.SphereGeometry(RADIUS * 1.14, 64, 64);
  const atmMat = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uColor: { value: new THREE.Color(EMERALD) } },
    vertexShader: `
      varying vec3 vN;
      void main() {
        vN = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      varying vec3 vN;
      uniform vec3 uColor;
      void main() {
        float intensity = pow(0.7 - dot(vN, vec3(0.0, 0.0, 1.0)), 3.0);
        gl_FragColor = vec4(uColor, 1.0) * clamp(intensity, 0.0, 1.0) * 0.9;
      }`,
  });
  const atmosphere = new THREE.Mesh(atmGeo, atmMat);
  group.add(atmosphere);
  disposables.push(atmGeo, atmMat);

  // --- Soft round sprite texture (shared by points + arc signals) ----------
  const dotTexture = makeDotTexture(THREE);
  disposables.push(dotTexture);

  // --- Glowing region points (pulsing) -------------------------------------
  // depthTest on + at just above the surface, so points on the far side are
  // occluded by the opaque globe and only front-facing ones show.
  const pointPos = REGIONS.map(([lat, lon]) =>
    latLonToVec3(THREE, lat, lon, RADIUS * 1.006)
  );
  const points: ThreeNS.Sprite[] = [];
  const pointMats: ThreeNS.SpriteMaterial[] = [];
  const pointPhase: number[] = [];
  const pointBase: number[] = [];
  for (let i = 0; i < pointPos.length; i++) {
    const mat = new THREE.SpriteMaterial({
      map: dotTexture,
      color: i % 4 === 0 ? TEAL : EMERALD,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const sprite = new THREE.Sprite(mat);
    sprite.position.copy(pointPos[i]);
    const base = 0.075 + (i % 3) * 0.012;
    sprite.scale.setScalar(base);
    group.add(sprite);
    points.push(sprite);
    pointMats.push(mat);
    pointBase.push(base);
    pointPhase.push((i * 12.9898) % (Math.PI * 2));
  }

  // --- Travelling arcs -----------------------------------------------------
  type Arc = {
    curve: ThreeNS.QuadraticBezierCurve3;
    lineMat: ThreeNS.LineBasicMaterial;
    signal: ThreeNS.Sprite;
    signalMat: ThreeNS.SpriteMaterial;
    speed: number;
    offset: number;
  };
  const arcs: Arc[] = [];
  for (let i = 0; i < ARCS.length; i++) {
    const [a, b] = ARCS[i];
    const va = pointPos[a];
    const vb = pointPos[b];
    // Control point pushed outward; bigger bulge for longer hops.
    const dist = va.distanceTo(vb);
    const mid = va
      .clone()
      .add(vb)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(RADIUS * (1.12 + dist * 0.28));
    const curve = new THREE.QuadraticBezierCurve3(va.clone(), mid, vb.clone());

    const pts = curve.getPoints(64);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
    const lineMat = new THREE.LineBasicMaterial({
      color: i % 2 === 0 ? EMERALD : TEAL,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const line = new THREE.Line(lineGeo, lineMat);
    group.add(line);
    disposables.push(lineGeo, lineMat);

    const signalMat = new THREE.SpriteMaterial({
      map: dotTexture,
      color: 0xd1fae5,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const signal = new THREE.Sprite(signalMat);
    signal.scale.setScalar(0.09);
    group.add(signal);

    arcs.push({
      curve,
      lineMat,
      signal,
      signalMat,
      speed: 0.16 + (i % 3) * 0.05,
      offset: (i * 0.37) % 1,
    });
  }

  // --- Lighting ------------------------------------------------------------
  const ambient = new THREE.AmbientLight(0xffffff, 0.55);
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(-2, 1.2, 3);
  scene.add(ambient, key);

  // --- Controls: drag to spin, auto-rotate resumes after release -----------
  const controls = new OrbitControls(camera, canvas);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.5;
  controls.autoRotate = !reduced;
  controls.autoRotateSpeed = 0.55;

  let resumeTimer: ReturnType<typeof setTimeout> | null = null;
  const onStart = () => {
    controls.autoRotate = false;
    canvas.style.cursor = "grabbing";
    if (resumeTimer) clearTimeout(resumeTimer);
  };
  const onEnd = () => {
    canvas.style.cursor = "grab";
    if (reduced) return;
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      controls.autoRotate = true;
    }, 2000);
  };
  controls.addEventListener("start", onStart);
  controls.addEventListener("end", onEnd);

  // --- Continent labels ----------------------------------------------------
  // Local surface positions (in the group's frame); projected to screen space
  // each frame so labels pin to the landmass, face the camera + stay upright,
  // and fade out as the continent rotates to the back side.
  const labelLocals = CONTINENTS.map((c) =>
    latLonToVec3(THREE, c.lat, c.lon, RADIUS)
  );
  const lWorld = new THREE.Vector3();
  const lNormal = new THREE.Vector3();
  const lToCam = new THREE.Vector3();
  const lNdc = new THREE.Vector3();
  const groupCenter = new THREE.Vector3();

  const placeLabels = () => {
    const els = labelEls.current;
    if (!els) return;
    const w = canvas.clientWidth || mount.clientWidth || 1;
    const h = canvas.clientHeight || mount.clientHeight || 1;
    group.getWorldPosition(groupCenter);
    for (let i = 0; i < labelLocals.length; i++) {
      const el = els[i];
      if (!el) continue;
      lWorld.copy(labelLocals[i]);
      group.localToWorld(lWorld);
      // Facing: outward surface normal vs. direction to camera.
      lNormal.copy(lWorld).sub(groupCenter).normalize();
      lToCam.copy(camera.position).sub(lWorld).normalize();
      const facing = lNormal.dot(lToCam);
      // Only show once the continent is well onto the front, so labels stay
      // over the centre/right of the globe and never drift onto the hero text.
      const opacity = Math.min(Math.max((facing - 0.34) / 0.28, 0), 1);
      lNdc.copy(lWorld).project(camera);
      const sx = (lNdc.x * 0.5 + 0.5) * w;
      const sy = (-lNdc.y * 0.5 + 0.5) * h;
      el.style.opacity = opacity.toFixed(3);
      el.style.transform = `translate(-50%, -50%) translate(${sx.toFixed(1)}px, ${sy.toFixed(1)}px)`;
    }
  };

  // --- Animation -----------------------------------------------------------
  const clock = new THREE.Clock();
  let raf = 0;
  const tmp = new THREE.Vector3();
  const renderOnce = () => {
    renderer.render(scene, camera);
    placeLabels();
  };

  const animate = () => {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Floating drift — the globe hangs and sways in space. Kept modest so
    // the (now smaller) globe stays neatly within the hero as it moves.
    group.position.y = Math.sin(t * 0.85) * 0.13;
    group.position.x = Math.cos(t * 0.55) * 0.08;
    // Organic axis wobble on top of the base tilt.
    group.rotation.z = 0.32 + Math.sin(t * 0.5) * 0.045;
    group.rotation.x = Math.sin(t * 0.37) * 0.04;

    // Pulse the region points (scale + opacity, asynchronous).
    for (let i = 0; i < points.length; i++) {
      const s = 0.5 + 0.5 * Math.sin(t * 1.7 + pointPhase[i]);
      points[i].scale.setScalar(pointBase[i] * (1 + 0.32 * s));
      pointMats[i].opacity = 0.45 + 0.5 * s;
    }

    // Advance each arc's travelling signal; fade in over the trip, out at the end.
    for (const arc of arcs) {
      const u = (t * arc.speed + arc.offset) % 1;
      arc.curve.getPointAt(u, tmp);
      arc.signal.position.copy(tmp);
      arc.signalMat.opacity = Math.sin(u * Math.PI); // 0 → 1 → 0 across the arc
      arc.lineMat.opacity = 0.2 + 0.14 * Math.sin(u * Math.PI);
    }

    controls.update();
    renderer.render(scene, camera);
    placeLabels();
  };

  if (reduced) {
    // No self-animation. Show a calm static frame; re-render only on drag.
    for (const arc of arcs) {
      arc.signalMat.opacity = 0;
      arc.lineMat.opacity = 0.24;
    }
    controls.addEventListener("change", renderOnce);
    renderOnce();
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
    if (reduced) renderOnce();
  };
  const ro = new ResizeObserver(onResize);
  ro.observe(mount);

  // --- Cleanup -------------------------------------------------------------
  return () => {
    cancelAnimationFrame(raf);
    if (resumeTimer) clearTimeout(resumeTimer);
    ro.disconnect();
    controls.removeEventListener("start", onStart);
    controls.removeEventListener("end", onEnd);
    controls.removeEventListener("change", renderOnce);
    controls.dispose();
    for (const mat of pointMats) mat.dispose();
    for (const arc of arcs) arc.signalMat.dispose();
    for (const d of disposables) d.dispose();
    renderer.dispose();
    if (canvas.parentNode === mount) mount.removeChild(canvas);
  };
}

/** Builds a small round soft-edged sprite texture for points / arc signals. */
function makeDotTexture(THREE: typeof ThreeNS): ThreeNS.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(209,250,229,0.95)");
  g.addColorStop(0.6, "rgba(16,185,129,0.35)");
  g.addColorStop(1, "rgba(16,185,129,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
