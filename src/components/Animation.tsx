import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Animation = ({ style }: { style?: React.CSSProperties }) => {
  const { scene } = useGLTF(
    "/src/assets/animations/logo-3d-christianitatisv001.glb"
  );
  return (
    <Canvas style={{ height: "100vh", width: "100%", ...style }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <primitive object={scene} position={[0, -1, 0]} />
      <OrbitControls />
    </Canvas>
  );
};

export default Animation;
