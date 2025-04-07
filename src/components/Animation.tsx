import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../store/store'
import gsap from 'gsap'

function Model() {
  const { scene } = useGLTF('/src/assets/animations/arvore-logo-3d-christianitatisv0001.glb')
  const modelRef = useRef<THREE.Group>()
  const { isRotating, rotationSpeed } = useStore()

  // Centraliza o modelo usando Box3
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const center = new THREE.Vector3()
    box.getCenter(center)
    scene.position.sub(center)
    scene.position.y = -1 // Posiciona o modelo mais abaixo
  }, [scene])

  useFrame((state, delta) => {
    if (modelRef.current && isRotating) {
      modelRef.current.rotation.y += delta * rotationSpeed
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.03
    }
  })

  // Configuração inicial do modelo
  scene.scale.set(0.8, 0.8, 0.8)
  scene.rotation.set(0, Math.PI, 0)

  // Ajusta os materiais para cores mais vibrantes
  scene.traverse(node => {
    if (node instanceof THREE.Mesh && node.material) {
      const material = node.material as THREE.MeshStandardMaterial
      material.metalness = 0.9
      material.roughness = 0.1
      material.envMapIntensity = 1.5
    }
  })

  const handleHover = (isHovered: boolean) => {
    if (modelRef.current) {
      gsap.to(modelRef.current.scale, {
        x: isHovered ? 0.85 : 0.8,
        y: isHovered ? 0.85 : 0.8,
        z: isHovered ? 0.85 : 0.8,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  return (
    <primitive
      ref={modelRef}
      object={scene}
      onPointerOver={() => handleHover(true)}
      onPointerOut={() => handleHover(false)}
    />
  )
}

interface AnimationProps {
  style?: React.CSSProperties
}

const Animation: React.FC<AnimationProps> = ({ style }) => {
  return (
    <div
      className="absolute inset-0"
      style={{
        height: '100vh',
        width: '100%',
        background: 'rgb(243, 244, 246)',
        ...style,
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 3.5],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          {/* Luzes ambiente para iluminação geral */}
          <ambientLight intensity={0.5} />
          <ambientLight intensity={0.8} />

          {/* Luzes direcionais simulando o sol */}
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <directionalLight position={[0, 10, 5]} intensity={1.5} />

          <Model />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
            dampingFactor={0.05}
            rotateSpeed={0.8}
            zoomSpeed={0.5}
            minDistance={3}
            maxDistance={8}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Animation
