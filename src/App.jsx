import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Scene } from './Scene';
import { scaleObjects } from './scaleObjects';
import './index.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    let timer;
    if (autoPlay && !isAnimating) {
      timer = setTimeout(() => {
        handleNext();
      }, 3000); // Wait 3 seconds between transitions
    }
    return () => clearTimeout(timer);
  }, [autoPlay, isAnimating, currentIndex]);

  const handleNext = () => {
    if (currentIndex < scaleObjects.length - 1) {
      setIsAnimating(true);
      setCurrentIndex(prev => prev + 1);
    } else if (autoPlay) {
      setIsAnimating(true);
      setCurrentIndex(0); // Loop back to start
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsAnimating(true);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  const toggleAutoPlay = () => {
    setAutoPlay(prev => !prev);
  };

  const currentObject = scaleObjects[currentIndex];

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <div className="ui-overlay">
        <h2>{currentObject.name}</h2>
        <p><strong>Description:</strong> {currentObject.description}</p>
        <p><strong>Scale:</strong> {currentObject.scale}x</p>
        <p><strong>Relative Scale:</strong> {currentObject.relativeScale}x from previous</p>
        <p><strong>Object:</strong> {currentIndex + 1} of {scaleObjects.length}</p>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Scene
          objects={scaleObjects}
          currentIndex={currentIndex}
          onAnimationComplete={handleAnimationComplete}
        />
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>

      <div className="controls">
        <button onClick={handlePrevious} disabled={currentIndex === 0 || isAnimating}>
          ← Previous
        </button>
        <button onClick={toggleAutoPlay}>
          {autoPlay ? '⏸ Pause' : '▶ Auto Play'}
        </button>
        <button onClick={handleNext} disabled={isAnimating}>
          Next →
        </button>
      </div>
    </div>
  );
}

export default App;
