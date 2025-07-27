import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// === Ground Component ===
const Ground = () => {
  const groundRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (groundRef.current) {
      const geometry = groundRef.current.geometry as THREE.PlaneGeometry;
      const position = geometry.attributes.position;
      const array = position.array as Float32Array;

      for (let i = 0; i < array.length; i += 3) {
        array[i + 1] =
          Math.sin(array[i] * 0.5) * 0.2 +
          Math.cos(array[i + 2] * 0.5) * 0.2;
      }

      geometry.computeVertexNormals();
      position.needsUpdate = true;
    }
  }, []);

  return (
    <mesh
      ref={groundRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, 0]}
      receiveShadow
    >
      <planeGeometry args={[100, 100, 32, 32]} />
      <meshStandardMaterial color="#3B5323" roughness={0.8} metalness={0.1} />
    </mesh>
  );
};

export default Ground; 