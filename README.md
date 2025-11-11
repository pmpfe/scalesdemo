# Scales Demo

Demo animation of objects in the universe of different scales using React Three Fiber.

## Features

- 🔬 **Scale Transitions**: Smooth zoom animations between objects at different scales (e.g., 10² factor)
- 🎨 **Ease In/Ease Out**: Cubic easing functions for natural-looking camera transitions
- 📊 **Data-Driven**: Objects defined in a simple configuration table
- 🎮 **Interactive Controls**: Navigate manually or use auto-play mode
- 🌐 **3D Rendering**: Built with React Three Fiber and Three.js
- 📦 **Model Support**: Ready to support GLTF and OBJ model formats

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

### Navigation Controls

- **Previous Button**: Navigate to the previous object (disabled at first object)
- **Auto Play Button**: Toggle automatic progression through objects
- **Next Button**: Navigate to the next object (loops back to start in auto-play mode)
- **Mouse Controls**: Use mouse to rotate, zoom, and pan the 3D view (OrbitControls)

### Adding Objects

Edit `src/scaleObjects.js` to add or modify objects:

```javascript
export const scaleObjects = [
  {
    name: "Object Name",
    description: "Object description",
    scale: 1,              // Absolute scale value
    relativeScale: 100,    // Scale relative to previous object (e.g., 10² = 100)
    color: "#ff6b6b",      // Hex color for basic shapes
    type: "sphere"         // "sphere", "box", or "model"
  },
  // For 3D models:
  {
    name: "Custom Model",
    description: "Imported 3D model",
    scale: 1000,
    relativeScale: 100,
    modelPath: "/models/your-model.gltf",  // Path to GLTF/GLB file
    type: "model"
  }
];
```

### Supported Object Types

- **sphere**: Simple sphere geometry
- **box**: Simple box geometry
- **model**: External 3D model (GLTF/GLB format) - requires modelPath property

## Current Example Objects

1. **Atom** (Hydrogen atom) - Base scale: 1x
2. **Virus** (Coronavirus particle) - Scale: 100x (10² larger than atom)
3. **Cell** (Human cell) - Scale: 10,000x (10² larger than virus)

## Technology Stack

- **React** 18.2.0
- **React Three Fiber** 8.15.0 - React renderer for Three.js
- **@react-three/drei** 9.88.0 - Useful helpers for R3F
- **Three.js** 0.158.0 - 3D graphics library
- **Vite** 5.0.0 - Build tool and dev server

## Project Structure

```
scalesdemo/
├── src/
│   ├── App.jsx              # Main application component
│   ├── Scene.jsx            # 3D scene setup and object rendering
│   ├── ScaleObject.jsx      # Individual 3D object component
│   ├── AnimatedCamera.jsx   # Camera animation with easing
│   ├── scaleObjects.js      # Object configuration table
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies and scripts
```

## Animation Details

The animation system uses:
- **Cubic ease-in-out** function for smooth, natural transitions
- **Camera position interpolation** for zoom effects
- **Fade transitions** between objects
- **2-second transition duration** (configurable in Scene.jsx)
- **3-second delay** in auto-play mode

## License

ISC
