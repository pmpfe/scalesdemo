// Table of objects at different scales
// Each object has a scale factor relative to the previous one
// Format: { name, description, scale, color, type }

export const scaleObjects = [
  {
    name: "Atom",
    description: "Hydrogen atom",
    scale: 1, // Base scale: 10^-10 meters (1 Angstrom)
    relativeScale: 1,
    color: "#ff6b6b",
    type: "sphere"
  },
  {
    name: "Virus",
    description: "Coronavirus particle",
    scale: 100, // 10^-8 meters (100 nanometers)
    relativeScale: 100, // 10^2 times larger than atom
    color: "#4ecdc4",
    type: "sphere"
  },
  {
    name: "Cell",
    description: "Human cell",
    scale: 10000, // 10^-6 meters (10 micrometers)
    relativeScale: 100, // 10^2 times larger than virus
    color: "#95e1d3",
    type: "sphere"
  }
];

// You can extend this list with more objects and even reference external models
// For example:
// {
//   name: "Ant",
//   description: "Common ant",
//   scale: 1000000, // 1mm
//   relativeScale: 100,
//   modelPath: "/models/ant.gltf", // Path to GLTF model
//   type: "model"
// }
