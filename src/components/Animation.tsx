import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Animation = () => {
  const { scene } = useGLTF(
    "/src/assets/animations/arvore-sem-escrita-tronco-fundo-infinito.glb"
  );
  return (
    <Canvas style={{ height: "100vh", width: "100%" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <primitive object={scene} position={[0, -1, 0]} />
      <OrbitControls />
    </Canvas>
  );
};

export default Animation;
