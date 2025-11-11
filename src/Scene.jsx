import React, { useState, useEffect } from 'react';
import { ScaleObject } from './ScaleObject';
import { AnimatedCamera } from './AnimatedCamera';

export function Scene({ objects, currentIndex, onAnimationComplete }) {
  const [cameraTarget, setCameraTarget] = useState({
    position: [0, 0, 10],
    zoom: 1
  });

  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < objects.length) {
      const currentObject = objects[currentIndex];
      
      // Calculate camera position and zoom based on object scale
      // Smaller objects need the camera closer or more zoom
      const baseDistance = 5;
      const scaleFactor = 1 / currentObject.scale;
      const zoomLevel = Math.max(0.1, Math.min(currentObject.scale * 0.5, 100));
      
      setCameraTarget({
        position: [0, 0, baseDistance],
        zoom: zoomLevel
      });
    }
  }, [currentIndex, objects]);

  return (
    <>
      <AnimatedCamera
        targetPosition={cameraTarget.position}
        targetZoom={cameraTarget.zoom}
        duration={2000}
        onComplete={onAnimationComplete}
      />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      {objects.map((object, index) => (
        <ScaleObject
          key={index}
          object={object}
          isActive={index === currentIndex}
          progress={index === currentIndex ? 1 : 0}
        />
      ))}
      
      <gridHelper args={[20, 20]} />
    </>
  );
}
