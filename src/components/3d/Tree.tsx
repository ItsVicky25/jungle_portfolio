import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// === Tree Component ===
const Tree = ({
  position,
  scale = 1,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}) => {
  const treeRef = useRef<THREE.Group>(null);
  const leavesRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 1.5;
    if (treeRef.current && leavesRef.current) {
      treeRef.current.rotation.z = Math.sin(t) * 0.002;
      leavesRef.current.rotation.y = Math.sin(t * 0.5) * 0.004;
    }
  });

  return (
    <group position={position} rotation={rotation} ref={treeRef}>
      <mesh castShadow position={[0, scale * 2, 0]}>
        <cylinderGeometry args={[scale * 0.2, scale * 0.3, scale * 4, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} metalness={0.1} />
      </mesh>
      <group ref={leavesRef} position={[0, scale * 4, 0]}>
        {[0, 1, 2].map((layer, i) => (
          <mesh
            key={i}
            castShadow
            position={[
              Math.sin(i * Math.PI * 2 / 3) * 0.3,
              layer * 0.5,
              Math.cos(i * Math.PI * 2 / 3) * 0.3,
            ]}
          >
            <coneGeometry args={[scale * (1.2 - layer * 0.2), scale * 1.5, 8]} />
            <meshStandardMaterial
              color={`hsl(${120 + i * 5}, ${60 + i * 5}%, ${30 + i * 2}%)`}
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default Tree; 