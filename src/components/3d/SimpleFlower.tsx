import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SimpleFlowerProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  color?: string;
}

const SimpleFlower: React.FC<SimpleFlowerProps> = ({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  color = '#ff69b4'
}) => {
  const group = useRef<THREE.Group>(null);
  const petalCount = 8;
  const petalGeometry = new THREE.ConeGeometry(0.5, 1, 4);
  const centerGeometry = new THREE.SphereGeometry(0.3, 16, 16);
  const stemGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);

  useFrame((state) => {
    if (group.current) {
      // Gentle swaying animation
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group
      ref={group}
      position={position}
      scale={scale}
      rotation={rotation}
    >
      {/* Petals */}
      {Array.from({ length: petalCount }).map((_, i) => (
        <mesh
          key={`petal-${i}`}
          geometry={petalGeometry}
          position={[0, 0.5, 0]}
          rotation={[0, 0, (i * Math.PI * 2) / petalCount]}
        >
          <meshStandardMaterial color={color} />
        </mesh>
      ))}

      {/* Center */}
      <mesh position={[0, 0.5, 0]}>
        <primitive object={centerGeometry} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>

      {/* Stem */}
      <mesh position={[0, -0.5, 0]}>
        <primitive object={stemGeometry} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
};

export default SimpleFlower; 