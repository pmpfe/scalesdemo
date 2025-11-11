import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Easing function for smooth transitions
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export function ScaleObject({ object, isActive, progress }) {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      // Rotate the object slowly
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
      
      // Scale based on progress with easing
      const easedProgress = easeInOutCubic(progress);
      const targetOpacity = isActive ? 1 : 0;
      
      if (meshRef.current.material) {
        meshRef.current.material.opacity = THREE.MathUtils.lerp(
          meshRef.current.material.opacity,
          targetOpacity,
          0.05
        );
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      {object.type === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
      {object.type === 'box' && <boxGeometry args={[1, 1, 1]} />}
      <meshStandardMaterial
        color={object.color}
        transparent
        opacity={isActive ? 1 : 0}
      />
    </mesh>
  );
}
