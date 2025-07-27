import React, { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
// import { GLTF } from 'three-stdlib';

// Remove GLTFResult type definition
// type GLTFResult = GLTF & {
//   nodes: {
//     flower: THREE.Mesh;
//     petals: THREE.Mesh;
//     stem: THREE.Mesh;
//   };
//   materials: {
//     flowerMaterial: THREE.MeshStandardMaterial;
//     stemMaterial: THREE.MeshStandardMaterial;
//   };
// };

interface FlowerProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

const Flower: React.FC<FlowerProps> = ({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0]
}) => {
  const group = useRef<THREE.Group>(null);

  // Load the FBX model
  const fbx = useFBX('/models/white_flower.FBX'); // Assuming the FBX is in public/models folder

  // Load the texture (Assuming diffuse.tga has been converted to diffuse.jpg)
  // IMPORTANT: You need to convert diffuse.tga to diffuse.jpg (or .png)
  // and place it in the public/models/ directory.
  const texture = useLoader(TextureLoader, '/models/diffuse.jpg'); // Using useLoader for texture

  // Apply the texture to all meshes in the loaded model once both are ready
  useEffect(() => {
    if (fbx && texture) {
      fbx.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          // Create a new material with the loaded texture
          const newMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            // You might need to copy other properties from the original material
            // For example: color, roughness, metalness, normalMap, etc.
            // based on how your FBX materials are set up.
          });

          // Try to copy relevant properties from the original material(s)
          const originalMaterial = child.material;

          if (originalMaterial) {
            const materialsToCopy = Array.isArray(originalMaterial) ? originalMaterial : [originalMaterial];

            materialsToCopy.forEach(mat => {
              // Copy relevant properties, excluding the map
              // We use a try-catch block in case a property access fails
              try {
                if ('color' in mat && mat.color instanceof THREE.Color) (newMaterial as THREE.MeshStandardMaterial).color = mat.color.clone();
                if ('roughness' in mat) (newMaterial as THREE.MeshStandardMaterial).roughness = mat.roughness;
                if ('metalness' in mat) (newMaterial as THREE.MeshStandardMaterial).metalness = mat.metalness;
                // Add other properties as needed (e.g., normalMap, aoMap, etc.)
                // based on what properties your FBX material originally had.
              } catch (e) {
                console.warn('Error copying material property:', e);
              }
            });
          }


          // Assign the new material to the child
          child.material = newMaterial;
        }
      });
      // Update the scene graph
      fbx.updateMatrixWorld(true);
    }
  }, [fbx, texture]); // Re-run when fbx or texture loads

  useFrame((state) => {
    if (group.current) {
      // Gentle swaying animation (optional)
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  // Clone the loaded FBX object to use it multiple times if needed
  // We clone *after* potentially applying the texture
  const clonedFbx = fbx ? fbx.clone() : null;

  if (!clonedFbx) return null; // Don't render until the model and texture are loaded

  return (
    <group
      ref={group}
      position={position}
      scale={scale}
      rotation={rotation}
      dispose={null}
    >
      {/* Add the loaded FBX model */}
      <primitive object={clonedFbx} attach="base" />
    </group>
  );
};

export default Flower; 