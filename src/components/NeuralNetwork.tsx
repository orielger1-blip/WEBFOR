import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ============================================================================
// GOLDEN DASHED LINE BRAIN
// Accurate human brain wireframe with glowing golden dashed lines
// Minimalist tech aesthetic, surgical precision
// ============================================================================

const CONFIG = {
  // Golden colors - bright and luminous
  COLOR_GOLD_PRIMARY: '#FFD700',      // Pure gold
  COLOR_GOLD_BRIGHT: '#FFC125',       // Bright gold for main lines
  COLOR_GOLD_ACCENT: '#FFAA00',       // Accent gold
  COLOR_GOLD_GLOW: '#FFE555',         // Glow color
  COLOR_BACKGROUND: '#000000',        // Pure black

  BRAIN_SCALE: 1.5,
  ROTATION_SPEED: 0.04,

  // Detailed brain structure
  CORTEX_RINGS: 50,           // Horizontal contours
  MERIDIAN_LINES: 40,         // Vertical lines
  SULCI_LINES: 120,           // Brain fold lines (sulci/gyri)
  NEURAL_CONNECTIONS: 180,    // Neural pathway connections

  // Dashed line settings
  DASH_SIZE: 0.03,
  GAP_SIZE: 0.02,

  CAMERA_POSITION: [0, 0.1, 4.5] as const,
  CAMERA_FOV: 35,

  BLOOM_INTENSITY: 1.2,
  BLOOM_THRESHOLD: 0.1,
  BLOOM_RADIUS: 0.6,
};

// ============================================================================
// ANATOMICALLY ACCURATE BRAIN SURFACE
// ============================================================================
const brainSurface = (u: number, v: number, hemisphere: 'left' | 'right'): THREE.Vector3 => {
  const theta = u * Math.PI;        // 0 to PI (top to bottom)
  const phi = v * Math.PI * 2;      // 0 to 2PI (around)

  // Base ellipsoid - brain proportions
  let x = 0.75 * Math.sin(theta) * Math.cos(phi);
  let y = 0.62 * Math.cos(theta);
  let z = 0.95 * Math.sin(theta) * Math.sin(phi);

  // Realistic brain folds (sulci and gyri)
  const gyrus1 = Math.sin(theta * 5) * Math.cos(phi * 4) * 0.045;
  const gyrus2 = Math.sin(theta * 8 + phi * 2) * Math.cos(phi * 6) * 0.025;
  const gyrus3 = Math.sin(theta * 12 + phi) * 0.015;

  const n = new THREE.Vector3(x, y, z).normalize();
  const foldDepth = gyrus1 + gyrus2 + gyrus3;
  x += n.x * foldDepth;
  y += n.y * foldDepth;
  z += n.z * foldDepth;

  // Frontal lobe bulge
  if (z > 0.2) {
    const frontalBulge = Math.pow(Math.max(0, z - 0.2), 0.5) * 0.15;
    z += frontalBulge * Math.sin(theta);
  }

  // Occipital lobe (back)
  if (z < -0.3) {
    const occipitalBulge = Math.pow(Math.abs(z + 0.3), 0.5) * 0.08;
    z -= occipitalBulge * Math.sin(theta);
  }

  // Temporal lobe (sides, lower)
  const temporalFactor = Math.max(0, -y - 0.1) * Math.sin(theta) * 0.12;
  x += (hemisphere === 'left' ? -1 : 1) * temporalFactor;

  // Parietal bulge (top-back)
  if (y > 0.2 && z < 0) {
    y += 0.05 * Math.sin(theta);
  }

  // Hemisphere separation
  const separation = 0.38;
  x += hemisphere === 'left' ? -separation : separation;

  // Central fissure gap
  if (hemisphere === 'left') x = Math.min(x, -0.06);
  else x = Math.max(x, 0.06);

  return new THREE.Vector3(x, y, z).multiplyScalar(CONFIG.BRAIN_SCALE);
};

// ============================================================================
// DASHED LINE COMPONENT
// ============================================================================
const DashedLine = ({
  points,
  color,
  opacity = 0.9,
  dashSize = CONFIG.DASH_SIZE,
  gapSize = CONFIG.GAP_SIZE,
  lineWidth = 1
}: {
  points: THREE.Vector3[];
  color: string;
  opacity?: number;
  dashSize?: number;
  gapSize?: number;
  lineWidth?: number;
}) => {
  const lineRef = useRef<THREE.Line>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  const material = useMemo(() => new THREE.LineDashedMaterial({
    color: color,
    transparent: true,
    opacity: opacity,
    dashSize: dashSize,
    gapSize: gapSize,
    linewidth: lineWidth,
  }), [color, opacity, dashSize, gapSize, lineWidth]);

  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.computeLineDistances();
    }
  }, [points]);

  const line = useMemo(() => {
    const l = new THREE.Line(geometry, material);
    l.computeLineDistances();
    return l;
  }, [geometry, material]);

  return <primitive ref={lineRef} object={line} />;
};

// ============================================================================
// CORTEX CONTOURS - Horizontal rings following brain surface
// ============================================================================
const CortexContours = () => {
  const lines = useMemo(() => {
    const allLines: { points: THREE.Vector3[]; opacity: number }[] = [];
    const segments = 100;

    for (const hemisphere of ['left', 'right'] as const) {
      for (let ring = 0; ring < CONFIG.CORTEX_RINGS; ring++) {
        const u = (ring + 0.5) / CONFIG.CORTEX_RINGS;
        const points: THREE.Vector3[] = [];

        for (let i = 0; i <= segments; i++) {
          const v = i / segments;
          points.push(brainSurface(u, v, hemisphere));
        }

        // Vary opacity for depth effect
        const opacity = 0.5 + Math.sin(u * Math.PI) * 0.4;
        allLines.push({ points, opacity });
      }
    }
    return allLines;
  }, []);

  return (
    <group>
      {lines.map((line, i) => (
        <DashedLine
          key={`contour-${i}`}
          points={line.points}
          color={CONFIG.COLOR_GOLD_BRIGHT}
          opacity={line.opacity}
        />
      ))}
    </group>
  );
};

// ============================================================================
// MERIDIAN LINES - Vertical lines from top to bottom
// ============================================================================
const MeridianLines = () => {
  const lines = useMemo(() => {
    const allLines: { points: THREE.Vector3[]; opacity: number }[] = [];
    const segments = 80;

    for (const hemisphere of ['left', 'right'] as const) {
      for (let m = 0; m < CONFIG.MERIDIAN_LINES; m++) {
        const v = m / CONFIG.MERIDIAN_LINES;
        const points: THREE.Vector3[] = [];

        for (let i = 0; i <= segments; i++) {
          const u = i / segments;
          points.push(brainSurface(u, v, hemisphere));
        }

        const opacity = 0.4 + Math.abs(Math.sin(v * Math.PI * 2)) * 0.3;
        allLines.push({ points, opacity });
      }
    }
    return allLines;
  }, []);

  return (
    <group>
      {lines.map((line, i) => (
        <DashedLine
          key={`meridian-${i}`}
          points={line.points}
          color={CONFIG.COLOR_GOLD_PRIMARY}
          opacity={line.opacity}
          dashSize={0.025}
          gapSize={0.015}
        />
      ))}
    </group>
  );
};

// ============================================================================
// SULCI LINES - Brain fold detail lines
// ============================================================================
const SulciLines = () => {
  const lines = useMemo(() => {
    const allLines: THREE.Vector3[][] = [];
    const rng = (seed: number) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < CONFIG.SULCI_LINES; i++) {
      const hemisphere = i < CONFIG.SULCI_LINES / 2 ? 'left' : 'right';
      const seed = i * 7.31;

      // Start point
      let u = rng(seed) * 0.8 + 0.1;
      let v = rng(seed + 1);

      const points: THREE.Vector3[] = [];
      const length = 8 + Math.floor(rng(seed + 2) * 12);

      // Direction following brain surface
      const uDir = (rng(seed + 3) - 0.5) * 0.08;
      const vDir = (rng(seed + 4) - 0.5) * 0.1;

      for (let j = 0; j <= length; j++) {
        const t = j / length;
        const currentU = u + uDir * t + Math.sin(t * Math.PI * 2) * 0.02;
        const currentV = v + vDir * t;

        if (currentU > 0.05 && currentU < 0.95) {
          points.push(brainSurface(currentU, currentV % 1, hemisphere));
        }
      }

      if (points.length > 2) {
        allLines.push(points);
      }
    }
    return allLines;
  }, []);

  return (
    <group>
      {lines.map((points, i) => (
        <DashedLine
          key={`sulci-${i}`}
          points={points}
          color={CONFIG.COLOR_GOLD_ACCENT}
          opacity={0.6}
          dashSize={0.02}
          gapSize={0.012}
        />
      ))}
    </group>
  );
};

// ============================================================================
// NEURAL CONNECTIONS - Curved pathways connecting regions
// ============================================================================
const NeuralConnections = () => {
  const lines = useMemo(() => {
    const allLines: THREE.Vector3[][] = [];
    const rng = (seed: number) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < CONFIG.NEURAL_CONNECTIONS; i++) {
      const seed = i * 13.37;
      const hemisphere = rng(seed) > 0.5 ? 'left' : 'right';

      // Two points on brain surface
      const u1 = rng(seed + 1) * 0.7 + 0.15;
      const v1 = rng(seed + 2);
      const u2 = u1 + (rng(seed + 3) - 0.5) * 0.5;
      const v2 = v1 + (rng(seed + 4) - 0.5) * 0.5;

      const p1 = brainSurface(
        Math.max(0.05, Math.min(0.95, u1)),
        v1,
        hemisphere
      );
      const p2 = brainSurface(
        Math.max(0.05, Math.min(0.95, u2)),
        ((v2 % 1) + 1) % 1,
        hemisphere
      );

      // Curved connection lifted slightly above surface
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const liftAmount = 0.03 + rng(seed + 5) * 0.06;
      const outward = mid.clone().normalize().multiplyScalar(liftAmount);
      const control = mid.clone().add(outward);

      const curve = new THREE.QuadraticBezierCurve3(p1, control, p2);
      allLines.push(curve.getPoints(20));
    }

    return allLines;
  }, []);

  return (
    <group>
      {lines.map((points, i) => (
        <DashedLine
          key={`neural-${i}`}
          points={points}
          color={CONFIG.COLOR_GOLD_GLOW}
          opacity={0.45}
          dashSize={0.015}
          gapSize={0.01}
        />
      ))}
    </group>
  );
};

// ============================================================================
// CORPUS CALLOSUM - Connection between hemispheres
// ============================================================================
const CorpusCallosum = () => {
  const lines = useMemo(() => {
    const allLines: THREE.Vector3[][] = [];
    const connectionCount = 25;

    for (let i = 0; i < connectionCount; i++) {
      const t = i / (connectionCount - 1);
      const u = 0.3 + t * 0.4; // Middle portion

      // Connect left and right hemispheres
      const pLeft = brainSurface(u, 0.5, 'left');
      const pRight = brainSurface(u, 0.5, 'right');

      // Curve through center
      const mid = new THREE.Vector3().addVectors(pLeft, pRight).multiplyScalar(0.5);
      mid.y -= 0.1; // Dip down through center

      const curve = new THREE.QuadraticBezierCurve3(pLeft, mid, pRight);
      allLines.push(curve.getPoints(15));
    }

    return allLines;
  }, []);

  return (
    <group>
      {lines.map((points, i) => (
        <DashedLine
          key={`corpus-${i}`}
          points={points}
          color={CONFIG.COLOR_GOLD_PRIMARY}
          opacity={0.35}
          dashSize={0.018}
          gapSize={0.012}
        />
      ))}
    </group>
  );
};

// ============================================================================
// BRAIN STEM INDICATOR
// ============================================================================
const BrainStem = () => {
  const lines = useMemo(() => {
    const allLines: THREE.Vector3[][] = [];
    const stemLines = 12;

    for (let i = 0; i < stemLines; i++) {
      const angle = (i / stemLines) * Math.PI * 2;
      const radius = 0.08;

      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 15; j++) {
        const t = j / 15;
        const y = -0.9 - t * 0.4;
        const r = radius * (1 - t * 0.5);
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r * 0.8 - 0.2;
        points.push(new THREE.Vector3(x, y, z).multiplyScalar(CONFIG.BRAIN_SCALE));
      }
      allLines.push(points);
    }

    return allLines;
  }, []);

  return (
    <group>
      {lines.map((points, i) => (
        <DashedLine
          key={`stem-${i}`}
          points={points}
          color={CONFIG.COLOR_GOLD_ACCENT}
          opacity={0.5}
          dashSize={0.02}
          gapSize={0.015}
        />
      ))}
    </group>
  );
};

// ============================================================================
// VERTEX NODES - Key intersection points with subtle glow
// ============================================================================
const VertexNodes = () => {
  const ref = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const hemisphere = i < count / 2 ? 'left' : 'right';
      const seed = i * 17.43;
      const rng = (s: number) => {
        const x = Math.sin(s * 12.9898) * 43758.5453;
        return x - Math.floor(x);
      };

      const u = rng(seed) * 0.85 + 0.075;
      const v = rng(seed + 1);
      const p = brainSurface(u, v, hemisphere);

      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
      sizes[i] = 1.5 + rng(seed + 2) * 2;
    }

    return { positions, sizes };
  }, []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(CONFIG.COLOR_GOLD_GLOW) },
    },
    vertexShader: `
      attribute float size;
      varying float vSize;

      void main() {
        vSize = size;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (200.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vSize;

      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = 1.0 - smoothstep(0.0, 0.5, d);
        a = pow(a, 1.5);
        gl_FragColor = vec4(uColor, a * 0.7);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  return (
    <points ref={ref} material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
    </points>
  );
};

// ============================================================================
// BRAIN GROUP - All components rotating together
// ============================================================================
const BrainGroup = () => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    // Smooth continuous rotation
    ref.current.rotation.y = state.clock.elapsedTime * CONFIG.ROTATION_SPEED;
    // Subtle tilt variation
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.03;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.015;
  });

  return (
    <group ref={ref}>
      <CortexContours />
      <MeridianLines />
      <SulciLines />
      <NeuralConnections />
      <CorpusCallosum />
      <BrainStem />
      <VertexNodes />
    </group>
  );
};

// ============================================================================
// CAMERA RIG - Smooth mouse following
// ============================================================================
const CameraRig = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    mouse.current.x += (state.pointer.x * 0.25 - mouse.current.x) * 0.02;
    mouse.current.y += (state.pointer.y * 0.15 - mouse.current.y) * 0.02;
    camera.position.x = mouse.current.x;
    camera.position.y = CONFIG.CAMERA_POSITION[1] + mouse.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// ============================================================================
// SCENE
// ============================================================================
const Scene = () => (
  <>
    <color attach="background" args={[CONFIG.COLOR_BACKGROUND]} />
    <BrainGroup />
    <CameraRig />
    <EffectComposer>
      <Bloom
        luminanceThreshold={CONFIG.BLOOM_THRESHOLD}
        luminanceSmoothing={0.3}
        intensity={CONFIG.BLOOM_INTENSITY}
        radius={CONFIG.BLOOM_RADIUS}
      />
    </EffectComposer>
  </>
);

// ============================================================================
// EXPORT
// ============================================================================
const NeuralNetwork = () => (
  <div className="hero-canvas" style={{ background: CONFIG.COLOR_BACKGROUND }}>
    <Canvas
      camera={{ position: CONFIG.CAMERA_POSITION, fov: CONFIG.CAMERA_FOV }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
    >
      <Scene />
    </Canvas>
  </div>
);

export default NeuralNetwork;