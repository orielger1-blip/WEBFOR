import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const count = 500;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      // Gold color with variation
      colors[i3] = 0.96 + Math.random() * 0.04; // R
      colors[i3 + 1] = 0.62 + Math.random() * 0.2; // G
      colors[i3 + 2] = 0.04 + Math.random() * 0.1; // B
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const ConnectionLines = () => {
  const lineRef = useRef<THREE.LineSegments>(null);
  const count = 100;

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 6);
    for (let i = 0; i < count; i++) {
      const i6 = i * 6;
      positions[i6] = (Math.random() - 0.5) * 15;
      positions[i6 + 1] = (Math.random() - 0.5) * 15;
      positions[i6 + 2] = (Math.random() - 0.5) * 15;
      positions[i6 + 3] = (Math.random() - 0.5) * 15;
      positions[i6 + 4] = (Math.random() - 0.5) * 15;
      positions[i6 + 5] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      lineRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#f59e0b" transparent opacity={0.15} />
    </lineSegments>
  );
};

const FloatingOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial
        color="#f59e0b"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

const ParticleField = () => {
  return (
    <div className="hero-canvas">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <Particles />
        <ConnectionLines />
        <FloatingOrb />
      </Canvas>
    </div>
  );
};

export default ParticleField;
