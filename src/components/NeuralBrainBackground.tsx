import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ============================================================================
// PREMIUM NEURAL BRAIN VISUALIZATION
// Production-grade 3D brain with golden dashed wireframe
// Built with insights from comprehensive research
// ============================================================================

const CONFIG = {
  // Colors - Premium teal palette
  GOLD_PRIMARY: new THREE.Color('#14b8a6'),
  GOLD_BRIGHT: new THREE.Color('#5eead4'),
  GOLD_DEEP: new THREE.Color('#0f766e'),
  BACKGROUND: '#000000',

  // Brain geometry
  BRAIN_SCALE: 1.6,
  CONTOUR_RINGS: 35,
  MERIDIAN_LINES: 28,
  DETAIL_CURVES: 80,

  // Line styling
  DASH_SIZE: 0.035,
  GAP_SIZE: 0.025,
  LINE_OPACITY: 0.7,

  // Animation
  ROTATION_SPEED: 0.0004,
  BREATHE_SPEED: 0.3,
  BREATHE_AMOUNT: 0.015,

  // Camera
  CAMERA_POSITION: [0, 0, 5] as [number, number, number],
  CAMERA_FOV: 45,

  // Post-processing
  BLOOM_INTENSITY: 1.8,
  BLOOM_THRESHOLD: 0.15,
  BLOOM_SMOOTHING: 0.5,
  BLOOM_RADIUS: 0.85,
};

// ============================================================================
// BRAIN SURFACE GENERATOR - Anatomically accurate parametric surface
// ============================================================================
const brainSurface = (
  u: number,
  v: number,
  hemisphere: 'left' | 'right',
  time: number = 0
): THREE.Vector3 => {
  const theta = u * Math.PI;
  const phi = v * Math.PI * 2;

  // Base ellipsoid with brain proportions
  let x = 0.72 * Math.sin(theta) * Math.cos(phi);
  let y = 0.58 * Math.cos(theta);
  let z = 0.92 * Math.sin(theta) * Math.sin(phi);

  // Multi-frequency gyri (brain folds) - creates the wrinkled appearance
  const gyrus1 = Math.sin(theta * 6) * Math.cos(phi * 5) * 0.042;
  const gyrus2 = Math.sin(theta * 10 + phi * 1.5) * Math.cos(phi * 8) * 0.022;
  const gyrus3 = Math.sin(theta * 15 + phi * 2) * 0.012;
  const gyrus4 = Math.cos(theta * 4) * Math.sin(phi * 6) * 0.018;

  // Breathing animation
  const breathe = Math.sin(time * CONFIG.BREATHE_SPEED) * CONFIG.BREATHE_AMOUNT;

  const normal = new THREE.Vector3(x, y, z).normalize();
  const displacement = gyrus1 + gyrus2 + gyrus3 + gyrus4 + breathe;
  x += normal.x * displacement;
  y += normal.y * displacement;
  z += normal.z * displacement;

  // Frontal lobe (front bulge)
  if (z > 0.15) {
    const frontalBulge = Math.pow(Math.max(0, z - 0.15), 0.6) * 0.12;
    z += frontalBulge * Math.sin(theta);
  }

  // Occipital lobe (back)
  if (z < -0.25) {
    z -= Math.pow(Math.abs(z + 0.25), 0.5) * 0.06 * Math.sin(theta);
  }

  // Temporal lobe (lower sides)
  const temporalFactor = Math.max(0, -y - 0.08) * Math.sin(theta) * 0.1;
  x += (hemisphere === 'left' ? -1 : 1) * temporalFactor;

  // Parietal region (top-back)
  if (y > 0.15 && z < 0.1) {
    y += 0.04 * Math.sin(theta);
  }

  // Hemisphere positioning
  const separation = 0.34;
  x += hemisphere === 'left' ? -separation : separation;

  // Central fissure gap
  if (hemisphere === 'left') x = Math.min(x, -0.055);
  else x = Math.max(x, 0.055);

  return new THREE.Vector3(x, y, z).multiplyScalar(CONFIG.BRAIN_SCALE);
};

// ============================================================================
// DASHED LINE - Optimized component with proper computeLineDistances
// ============================================================================
const DashedBrainLine = ({
  points,
  color,
  opacity = CONFIG.LINE_OPACITY,
  dashSize = CONFIG.DASH_SIZE,
  gapSize = CONFIG.GAP_SIZE,
}: {
  points: THREE.Vector3[];
  color: THREE.Color;
  opacity?: number;
  dashSize?: number;
  gapSize?: number;
}) => {
  const lineRef = useRef<THREE.Line>(null);

  const { geometry, material, line } = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);

    const mat = new THREE.LineDashedMaterial({
      color: color,
      transparent: true,
      opacity: opacity,
      dashSize: dashSize,
      gapSize: gapSize,
      depthWrite: false,
      toneMapped: false, // Critical for bloom to work
    });

    const ln = new THREE.Line(geo, mat);
    ln.computeLineDistances();

    return { geometry: geo, material: mat, line: ln };
  }, [points, color, opacity, dashSize, gapSize]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return <primitive ref={lineRef} object={line} />;
};

// ============================================================================
// HORIZONTAL CONTOURS - Rings around the brain surface
// ============================================================================
const BrainContours = ({ time }: { time: number }) => {
  const lines = useMemo(() => {
    const allLines: { points: THREE.Vector3[]; opacity: number }[] = [];
    const segments = 100;

    for (const hemisphere of ['left', 'right'] as const) {
      for (let ring = 0; ring < CONFIG.CONTOUR_RINGS; ring++) {
        const u = (ring + 0.5) / CONFIG.CONTOUR_RINGS;

        // Skip very top and bottom for cleaner look
        if (u < 0.08 || u > 0.92) continue;

        const points: THREE.Vector3[] = [];

        for (let i = 0; i <= segments; i++) {
          const v = i / segments;
          points.push(brainSurface(u, v, hemisphere, time));
        }

        // Opacity varies with position for depth effect
        const baseOpacity = 0.4 + Math.sin(u * Math.PI) * 0.35;
        allLines.push({ points, opacity: baseOpacity });
      }
    }

    return allLines;
  }, [time]);

  return (
    <group>
      {lines.map((line, i) => (
        <DashedBrainLine
          key={`contour-${i}`}
          points={line.points}
          color={CONFIG.GOLD_PRIMARY}
          opacity={line.opacity}
        />
      ))}
    </group>
  );
};

// ============================================================================
// MERIDIAN LINES - Vertical lines from top to bottom
// ============================================================================
const BrainMeridians = ({ time }: { time: number }) => {
  const lines = useMemo(() => {
    const allLines: { points: THREE.Vector3[]; opacity: number }[] = [];
    const segments = 80;

    for (const hemisphere of ['left', 'right'] as const) {
      for (let m = 0; m < CONFIG.MERIDIAN_LINES; m++) {
        const v = m / CONFIG.MERIDIAN_LINES;
        const points: THREE.Vector3[] = [];

        for (let i = 0; i <= segments; i++) {
          const u = 0.05 + (i / segments) * 0.9; // Avoid poles
          points.push(brainSurface(u, v, hemisphere, time));
        }

        const opacity = 0.35 + Math.abs(Math.sin(v * Math.PI * 2)) * 0.25;
        allLines.push({ points, opacity });
      }
    }

    return allLines;
  }, [time]);

  return (
    <group>
      {lines.map((line, i) => (
        <DashedBrainLine
          key={`meridian-${i}`}
          points={line.points}
          color={CONFIG.GOLD_DEEP}
          opacity={line.opacity}
          dashSize={0.028}
          gapSize={0.02}
        />
      ))}
    </group>
  );
};

// ============================================================================
// SULCI CURVES - Brain fold detail lines
// ============================================================================
const BrainSulci = ({ time }: { time: number }) => {
  const lines = useMemo(() => {
    const allLines: THREE.Vector3[][] = [];

    // Deterministic pseudo-random
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < CONFIG.DETAIL_CURVES; i++) {
      const hemisphere = i < CONFIG.DETAIL_CURVES / 2 ? 'left' : 'right';
      const seed = i * 7.31;

      const startU = seededRandom(seed) * 0.7 + 0.15;
      const startV = seededRandom(seed + 1);
      const length = 6 + Math.floor(seededRandom(seed + 2) * 10);

      const uDirection = (seededRandom(seed + 3) - 0.5) * 0.06;
      const vDirection = (seededRandom(seed + 4) - 0.5) * 0.08;

      const points: THREE.Vector3[] = [];

      for (let j = 0; j <= length; j++) {
        const t = j / length;
        const u = startU + uDirection * t + Math.sin(t * Math.PI * 2) * 0.015;
        const v = startV + vDirection * t;

        if (u > 0.08 && u < 0.92) {
          points.push(brainSurface(u, v % 1, hemisphere as 'left' | 'right', time));
        }
      }

      if (points.length > 3) {
        allLines.push(points);
      }
    }

    return allLines;
  }, [time]);

  return (
    <group>
      {lines.map((points, i) => (
        <DashedBrainLine
          key={`sulci-${i}`}
          points={points}
          color={CONFIG.GOLD_BRIGHT}
          opacity={0.45}
          dashSize={0.022}
          gapSize={0.015}
        />
      ))}
    </group>
  );
};

// ============================================================================
// NEURAL CONNECTIONS - Curved pathways between regions
// ============================================================================
const NeuralPaths = ({ time }: { time: number }) => {
  const lines = useMemo(() => {
    const allLines: THREE.Vector3[][] = [];
    const connectionCount = 60;

    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < connectionCount; i++) {
      const seed = i * 13.37;
      const hemisphere = seededRandom(seed) > 0.5 ? 'left' : 'right';

      const u1 = seededRandom(seed + 1) * 0.6 + 0.2;
      const v1 = seededRandom(seed + 2);
      const u2 = u1 + (seededRandom(seed + 3) - 0.5) * 0.4;
      const v2 = v1 + (seededRandom(seed + 4) - 0.5) * 0.4;

      const p1 = brainSurface(
        Math.max(0.1, Math.min(0.9, u1)),
        v1,
        hemisphere as 'left' | 'right',
        time
      );
      const p2 = brainSurface(
        Math.max(0.1, Math.min(0.9, u2)),
        ((v2 % 1) + 1) % 1,
        hemisphere as 'left' | 'right',
        time
      );

      // Curved path lifted above surface
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const lift = 0.025 + seededRandom(seed + 5) * 0.04;
      const control = mid.clone().add(mid.clone().normalize().multiplyScalar(lift));

      const curve = new THREE.QuadraticBezierCurve3(p1, control, p2);
      allLines.push(curve.getPoints(16));
    }

    return allLines;
  }, [time]);

  return (
    <group>
      {lines.map((points, i) => (
        <DashedBrainLine
          key={`neural-${i}`}
          points={points}
          color={CONFIG.GOLD_BRIGHT}
          opacity={0.35}
          dashSize={0.018}
          gapSize={0.012}
        />
      ))}
    </group>
  );
};

// ============================================================================
// CORPUS CALLOSUM - Connections between hemispheres
// ============================================================================
const CorpusCallosum = ({ time }: { time: number }) => {
  const lines = useMemo(() => {
    const allLines: THREE.Vector3[][] = [];
    const count = 18;

    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const u = 0.25 + t * 0.45;

      const pLeft = brainSurface(u, 0.5, 'left', time);
      const pRight = brainSurface(u, 0.5, 'right', time);

      const mid = new THREE.Vector3().addVectors(pLeft, pRight).multiplyScalar(0.5);
      mid.y -= 0.08 + Math.sin(t * Math.PI) * 0.04;

      const curve = new THREE.QuadraticBezierCurve3(pLeft, mid, pRight);
      allLines.push(curve.getPoints(12));
    }

    return allLines;
  }, [time]);

  return (
    <group>
      {lines.map((points, i) => (
        <DashedBrainLine
          key={`corpus-${i}`}
          points={points}
          color={CONFIG.GOLD_PRIMARY}
          opacity={0.3}
          dashSize={0.02}
          gapSize={0.015}
        />
      ))}
    </group>
  );
};

// ============================================================================
// BRAIN STEM
// ============================================================================
const BrainStem = ({ time }: { time: number }) => {
  const lines = useMemo(() => {
    const allLines: THREE.Vector3[][] = [];
    const stemLines = 10;
    const breathe = Math.sin(time * CONFIG.BREATHE_SPEED) * CONFIG.BREATHE_AMOUNT;

    for (let i = 0; i < stemLines; i++) {
      const angle = (i / stemLines) * Math.PI * 2;
      const radius = 0.07;

      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 12; j++) {
        const t = j / 12;
        const y = -0.85 - t * 0.35;
        const r = radius * (1 - t * 0.4);
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r * 0.75 - 0.18;
        points.push(
          new THREE.Vector3(x, y + breathe, z).multiplyScalar(CONFIG.BRAIN_SCALE)
        );
      }
      allLines.push(points);
    }

    return allLines;
  }, [time]);

  return (
    <group>
      {lines.map((points, i) => (
        <DashedBrainLine
          key={`stem-${i}`}
          points={points}
          color={CONFIG.GOLD_DEEP}
          opacity={0.4}
          dashSize={0.025}
          gapSize={0.018}
        />
      ))}
    </group>
  );
};

// ============================================================================
// GLOWING NODES - Key neural intersection points
// ============================================================================
const NeuralNodes = ({ time }: { time: number }) => {
  const { positions, phases } = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      const hemisphere = i < count / 2 ? 'left' : 'right';
      const seed = i * 17.43;

      const u = seededRandom(seed) * 0.75 + 0.125;
      const v = seededRandom(seed + 1);
      const p = brainSurface(u, v, hemisphere, 0);

      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
      phases[i] = seededRandom(seed + 2) * Math.PI * 2;
    }

    return { positions, phases };
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: CONFIG.GOLD_BRIGHT },
        },
        vertexShader: `
          attribute float phase;
          uniform float uTime;
          varying float vAlpha;
          varying float vSize;

          void main() {
            float pulse = sin(uTime * 1.5 + phase) * 0.5 + 0.5;
            vAlpha = 0.4 + pulse * 0.6;
            vSize = 1.5 + pulse * 2.0;

            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = vSize * (280.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          varying float vAlpha;

          void main() {
            float dist = length(gl_PointCoord - 0.5);
            if (dist > 0.5) discard;

            float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
            alpha = pow(alpha, 1.5) * vAlpha;

            gl_FragColor = vec4(uColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
    []
  );

  useFrame(() => {
    material.uniforms.uTime.value = time;
  });

  return (
    <points material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-phase" args={[phases, 1]} />
      </bufferGeometry>
    </points>
  );
};

// ============================================================================
// MAIN BRAIN GROUP - All components with rotation
// ============================================================================
const BrainGroup = () => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    timeRef.current += delta;

    // Smooth rotation
    groupRef.current.rotation.y += CONFIG.ROTATION_SPEED;

    // Subtle tilt oscillation
    groupRef.current.rotation.x = Math.sin(timeRef.current * 0.15) * 0.03;
    groupRef.current.rotation.z = Math.sin(timeRef.current * 0.12) * 0.015;
  });

  const time = timeRef.current;

  return (
    <group ref={groupRef}>
      <BrainContours time={time} />
      <BrainMeridians time={time} />
      <BrainSulci time={time} />
      <NeuralPaths time={time} />
      <CorpusCallosum time={time} />
      <BrainStem time={time} />
      <NeuralNodes time={time} />
    </group>
  );
};

// ============================================================================
// CAMERA WITH MOUSE PARALLAX
// ============================================================================
const CameraController = () => {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    // Smooth mouse following
    mouseRef.current.x += (state.pointer.x * 0.3 - mouseRef.current.x) * 0.02;
    mouseRef.current.y += (state.pointer.y * 0.2 - mouseRef.current.y) * 0.02;

    camera.position.x = mouseRef.current.x;
    camera.position.y = CONFIG.CAMERA_POSITION[1] + mouseRef.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// ============================================================================
// SCENE - Lights, effects, and composition
// ============================================================================
const Scene = () => (
  <>
    <color attach="background" args={[CONFIG.BACKGROUND]} />

    <BrainGroup />
    <CameraController />

    <EffectComposer multisampling={4}>
      <Bloom
        luminanceThreshold={CONFIG.BLOOM_THRESHOLD}
        luminanceSmoothing={CONFIG.BLOOM_SMOOTHING}
        intensity={CONFIG.BLOOM_INTENSITY}
        radius={CONFIG.BLOOM_RADIUS}
        mipmapBlur
      />
    </EffectComposer>
  </>
);

// ============================================================================
// MAIN EXPORT
// ============================================================================
const NeuralBrainBackground = () => (
  <div className="neural-brain-background">
    <Canvas
      camera={{
        position: CONFIG.CAMERA_POSITION,
        fov: CONFIG.CAMERA_FOV,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
    >
      <Scene />
    </Canvas>
  </div>
);

export default NeuralBrainBackground;
