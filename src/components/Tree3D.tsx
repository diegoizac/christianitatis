import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

const Tree3D = () => {
  const treeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (treeRef.current) {
      treeRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={treeRef}>
      {/* Tronco */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Bolas coloridas */}
      <Sphere position={[0, 1.5, 0]} args={[0.4]}>
        <meshStandardMaterial color="#FF0000" metalness={0.5} roughness={0.2} />
      </Sphere>
      <Sphere position={[1, 0.5, 0]} args={[0.4]}>
        <meshStandardMaterial color="#0000FF" metalness={0.5} roughness={0.2} />
      </Sphere>
      <Sphere position={[-0.8, 0, 0]} args={[0.4]}>
        <meshStandardMaterial color="#FFFF00" metalness={0.5} roughness={0.2} />
      </Sphere>
      <Sphere position={[0.5, -0.5, 0.5]} args={[0.4]}>
        <meshStandardMaterial color="#00FF00" metalness={0.5} roughness={0.2} />
      </Sphere>
    </group>
  );
};

export default Tree3D;
