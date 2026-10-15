import { useEffect, useRef } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Color } from "three";
import ThreeGlobe from "three-globe";
import { useReducedMotion } from "framer-motion";
import countries from "../../data/globe.json";
import { destinations, globeArcs, globePoints } from "../../data/content";

/**
 * Hero globe — three-globe inside react-three-fiber.
 *
 * This is the heavy path, chosen for one reason: animated great-circle
 * arcs between countries, which `cobe` cannot draw at all. The whole
 * module is lazy-loaded from Hero so it never blocks first paint.
 *
 * Drag to rotate; it idles with a slow auto-rotation.
 */

extend({ ThreeGlobe });

const THEME = {
  globe: "#06100F", // sphere body — near-black so land dots carry the form
  emissive: "#04100E",
  emissiveIntensity: 0.1,
  shininess: 0.8,
  land: "rgba(12, 185, 193, 0.78)", // hex-polygon dots
  atmosphere: "#27DCE4",
  atmosphereAltitude: 0.17,
  ambient: "#3FE4EC",
  key: "#0CB9C1",
  fill: "#27DCE4",
};

const RING_PERIOD_MS = 1600;

function GlobeMesh({ reduced }) {
  const ref = useRef(null);

  // Sphere, land and atmosphere.
  useEffect(() => {
    const globe = ref.current;
    if (!globe) return;

    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.68)
      .hexPolygonColor(() => THEME.land)
      .showAtmosphere(true)
      .atmosphereColor(THEME.atmosphere)
      .atmosphereAltitude(THEME.atmosphereAltitude);

    const material = globe.globeMaterial();
    material.color = new Color(THEME.globe);
    material.emissive = new Color(THEME.emissive);
    material.emissiveIntensity = THEME.emissiveIntensity;
    material.shininess = THEME.shininess;
  }, []);

  // Arcs and destination points.
  useEffect(() => {
    const globe = ref.current;
    if (!globe) return;

    globe
      .arcsData(globeArcs)
      .arcStartLat((d) => d.startLat)
      .arcStartLng((d) => d.startLng)
      .arcEndLat((d) => d.endLat)
      .arcEndLng((d) => d.endLng)
      .arcColor((d) => d.color)
      .arcAltitude((d) => d.arcAlt)
      .arcStroke(() => 0.42)
      .arcDashLength(0.4)
      .arcDashGap(2)
      // Staggered start so the arcs fire in sequence rather than in unison.
      .arcDashInitialGap((d) => (d.order % 10) * 0.22)
      .arcDashAnimateTime(() => (reduced ? 0 : 2800));

    globe
      .pointsData(globePoints)
      .pointLat((d) => d.lat)
      .pointLng((d) => d.lng)
      .pointColor((d) => d.color)
      .pointAltitude(0.012)
      .pointRadius((d) => d.size);
  }, [reduced]);

  // Pulse rings, cycling through a few destinations at a time.
  useEffect(() => {
    const globe = ref.current;
    if (!globe) return undefined;

    globe
      .ringLat((d) => d.lat)
      .ringLng((d) => d.lng)
      .ringColor(() => (t) => `rgba(39, 220, 228, ${1 - t})`)
      .ringMaxRadius(3.4)
      .ringPropagationSpeed(2.2)
      .ringRepeatPeriod(700);

    if (reduced) {
      globe.ringsData([]);
      return undefined;
    }

    let step = 0;
    const cycle = () => {
      const picks = [0, 1, 2].map(
        (k) => destinations[(step * 3 + k) % destinations.length]
      );
      globe.ringsData(picks.map((d) => ({ lat: d.coords[0], lng: d.coords[1] })));
      step += 1;
    };

    cycle();
    const id = setInterval(cycle, RING_PERIOD_MS);
    return () => {
      clearInterval(id);
      globe.ringsData([]);
    };
  }, [reduced]);

  return <threeGlobe ref={ref} />;
}

export default function GlobeScene() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      className="globe-canvas"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 310], fov: 44, near: 100, far: 900 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight color={THEME.ambient} intensity={0.85} />
      <directionalLight color={THEME.key} position={[-180, 190, 220]} intensity={1.2} />
      <pointLight color={THEME.fill} position={[-220, 130, 200]} intensity={1} />

      <GlobeMesh reduced={reduced} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.45}
        autoRotate={!reduced}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI - Math.PI / 3.4}
      />
    </Canvas>
  );
}
