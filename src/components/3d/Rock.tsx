import React from 'react';

// === Rock Component (simplified) ===
const Rock = ({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) => (
  <mesh position={position} rotation={rotation}>
    <dodecahedronGeometry args={[1, 1]} />
    <meshStandardMaterial color="#708090" roughness={0.7} metalness={0.4} />
  </mesh>
);

export default Rock; 