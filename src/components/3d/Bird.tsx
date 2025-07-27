import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// === Bird Component ===
const Bird = ({ position = [0, 0, 0], scale = 1 }) => {
  const birdRef = useRef<THREE.Group>(null);
  const wingRef = useRef<THREE.Mesh>(null);
  const tailRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (birdRef.current && wingRef.current && tailRef.current) {
      birdRef.current.position.y = position[1] + Math.sin(t * 2) * 0.1;
      birdRef.current.position.x = position[0] + Math.sin(t + scale) * 0.3;
      birdRef.current.position.z = position[2] + Math.cos(t + scale) * 0.3;
      birdRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      wingRef.current.rotation.z = Math.sin(t * 15) * 0.2;
      tailRef.current.rotation.y = Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <group ref={birdRef} scale={[scale, scale, scale]}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#4A5568" />
      </mesh>
      <mesh ref={wingRef} position={[0, 0.1, 0]}>
        <boxGeometry args={[0.4, 0.02, 0.15]} />
        <meshStandardMaterial color="#4A5568" />
      </mesh>
      <mesh ref={tailRef} position={[0, 0, -0.15]}>
        <coneGeometry args={[0.05, 0.2, 4]} />
        <meshStandardMaterial color="#4A5568" />
      </mesh>
      <mesh position={[0, 0.1, 0.12]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#4A5568" />
      </mesh>
    </group>
  );
};

export default Bird; 