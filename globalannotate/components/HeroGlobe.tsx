"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type * as ThreeNS from "three";

// Brand palette
const NAVY = 0x0f172a;
const EMERALD = 0x10b981;

/**
 * Full world-map globe for the homepage hero background.
 *
 * - Desktop (>= 768px): a Three.js SphereGeometry wrapped in a complete
 *   equirectangular world map (public-domain Natural Earth land, rasterised
 *   to a brand-tinted texture: emerald→teal land, navy ocean — see
 *   /public/world-map.png). Slow continuous Y auto-rotation; click-drag to
 *   spin via OrbitControls, with auto-rotate resuming ~2s after release. A
 *   soft emerald atmosphere shell glows around the rim. Three.js + the
 *   controls + the texture are all dynamically imported inside the effect so
 *   they land in their own chunk and never block first paint / LCP.
 * - Mobile (< 768px): a static 2D circular world-map image — no canvas, no
 *   WebGL — so the hero stays fast on phones.
 * - prefers-reduced-motion: the globe renders but does not auto-rotate
 *   (drag still works; nothing moves on its own).
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

  // Build / tear down the Three.js scene (desktop only).
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
      cleanup = initGlobe(THREE, OrbitControls, mount, reduced, textureSrc);
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
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative aspect-square w-[135%] max-w-none translate-x-[6%] translate-y-[2%] overflow-hidden rounded-full ring-1 ring-brand-500/20">
            <Image
              src={mobileSrc}
              alt="World map showing GlobalAnnotate's global reach"
              fill
              priority={false}
              sizes="140vw"
              className="object-cover"
            />
            {/* Spherical shading + emerald rim so the flat map reads as a globe. */}
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
          </div>
        </div>
      )}
      {isDesktop && (
        <div
          ref={mountRef}
          className="absolute inset-0 translate-x-[18%] md:translate-x-[22%]"
        />
      )}
    </div>
  );
}

/**
 * Builds the textured world-map globe inside `mount`. Returns a cleanup
 * function that stops the loop, removes listeners, and disposes all GPU
 * resources (geometry, material, texture, renderer, controls).
 */
function initGlobe(
  THREE: typeof ThreeNS,
  OrbitControls: typeof import("three/examples/jsm/controls/OrbitControls.js").OrbitControls,
  mount: HTMLDivElement,
  reduced: boolean,
  textureSrc: string
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
  scene.add(group);

  const disposables: Array<{ dispose: () => void }> = [];

  // --- Globe sphere (texture loaded lazily) --------------------------------
  const geo = new THREE.SphereGeometry(RADIUS, 96, 96);
  const material = new THREE.MeshStandardMaterial({
    color: NAVY,
    roughness: 0.95,
    metalness: 0.0,
    // Partly self-lit so the map stays readable on the shaded side, but still
    // shaded enough to read as a real sphere.
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

  // --- Animation -----------------------------------------------------------
  let raf = 0;
  const renderOnce = () => renderer.render(scene, camera);

  const animate = () => {
    raf = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  if (reduced) {
    // No self-animation. Re-render only when the user drags.
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
    for (const d of disposables) d.dispose();
    renderer.dispose();
    if (canvas.parentNode === mount) mount.removeChild(canvas);
  };
}
