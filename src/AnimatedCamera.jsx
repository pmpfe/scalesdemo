import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Easing function for smooth zoom transitions
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export function AnimatedCamera({ targetPosition, targetZoom, duration = 2000, onComplete }) {
  const { camera } = useThree();
  const startPosition = useRef(new THREE.Vector3());
  const startZoom = useRef(1);
  const startTime = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    // Store starting position and zoom
    startPosition.current.copy(camera.position);
    startZoom.current = camera.zoom;
    startTime.current = Date.now();
    isAnimating.current = true;
  }, [targetPosition, targetZoom, camera]);

  useFrame(() => {
    if (!isAnimating.current || !startTime.current) return;

    const elapsed = Date.now() - startTime.current;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    // Interpolate position
    camera.position.lerpVectors(
      startPosition.current,
      new THREE.Vector3(...targetPosition),
      easedProgress
    );

    // Interpolate zoom
    camera.zoom = THREE.MathUtils.lerp(startZoom.current, targetZoom, easedProgress);
    camera.updateProjectionMatrix();

    // Check if animation is complete
    if (progress >= 1) {
      isAnimating.current = false;
      startTime.current = null;
      if (onComplete) {
        onComplete();
      }
    }
  });

  return null;
}
