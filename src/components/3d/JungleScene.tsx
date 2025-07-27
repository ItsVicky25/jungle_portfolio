import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useSpring, animated, SpringValue } from '@react-spring/three';
import { Environment, OrbitControls, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useThemeStore } from '../../store/themeStore';
import Flower from './Flower';
import Bird from './Bird';
import Ground from './Ground';
import Rock from './Rock';

// === JungleScene Main Component ===
const JungleScene: React.FC = () => {
  const { theme } = useThemeStore();
  const { scene } = useThree();

  const { intensity, fogColor } = useSpring({
    intensity: theme === 'dark' ? 0.3 : 1,
    fogColor: theme === 'dark' ? '#0F172A' : '#E2F3EB',
    config: { mass: 5, tension: 120, friction: 50 }
  });

  useEffect(() => {
    scene.fog = new THREE.FogExp2(theme === 'dark' ? '#0F172A' : '#E2F3EB', 0.02);
    return () => {
      scene.fog = null;
    };
  }, [scene, theme]);

  // Explicitly type the intensity value
  const pointLightIntensity: SpringValue<number> = intensity as SpringValue<number>;

  return (
    <>
      <animated.fog attach="fog" color={fogColor} near={1} far={50} />
      <animated.ambientLight intensity={intensity.to(i => i * 0.4)} />
      <animated.directionalLight
        position={[5, 10, 5]}
        intensity={intensity}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <animated.pointLight
        position={[-10, 15, -10]}
        intensity={pointLightIntensity.to(() => (theme === 'dark' ? 2 : 0.1))} // Use the explicitly typed variable
        color={theme === 'dark' ? '#E2ECFD' : '#FEF9C3'}
      />

      <Ground />

      <Float floatIntensity={1.2} rotationIntensity={0.3}>
        <group>
          {/* Trees with sparkle */}
          {/* <Tree position={[-6, 0, -4]} scale={1.2} />
          <Tree position={[5, 0, -6]} scale={1.5} />
          <Tree position={[-4, 0, -8]} scale={1} />
          <Tree position={[8, 0, -2]} scale={1.3} />
          <Tree position={[0, 0, -10]} scale={1.7} /> */}
          <Sparkles count={40} scale={15} size={2} speed={0.6} color="#9be7ff" />
        </group>
      </Float>

      {/* Flowers (using the FBX model) */}
      <group>
        <Flower position={[-3, 0, -3]} scale={0.05} rotation={[0, Math.PI / 4, 0]} />
        <Flower position={[2, 0, -4]} scale={0.08} rotation={[0, -Math.PI / 3, 0]} />
        <Flower position={[4, 0, -2]} scale={0.06} rotation={[0, Math.PI / 2, 0]} />
        {/* Add more flowers as needed */}
      </group>

      {/* Birds - flying in animated orbits */}
      <Bird position={[-3, 5, -4]} scale={0.5} />
      <Bird position={[2, 6, -3]} scale={0.4} />
      <Bird position={[4, 4, -5]} scale={0.6} />

      {/* Shimmering rocks */}
      <Rock position={[-5, 0, -7]} rotation={[0, Math.PI / 3, 0]} />
      <Rock position={[3, 0, -8]} rotation={[0, Math.PI / 5, 0]} />
      <Rock position={[-2, 0, -5]} rotation={[0, Math.PI / 4, 0]} />

      <Environment preset={theme === 'dark' ? 'night' : 'sunset'} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.5}
      />
    </>
  );
};

export default JungleScene;
