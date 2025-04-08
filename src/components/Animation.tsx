import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useSupabaseAnimation } from '@/hooks/useSupabaseAnimation'
import { Spinner } from './Spinner'
import { Suspense } from 'react'

interface AnimationProps {
  src: string
  className?: string
  style?: React.CSSProperties
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} position={[0, -1, 0]} scale={[1, 1, 1]} />
}

export function Animation({ src, className = '', style }: AnimationProps) {
  const { url, loading, error } = useSupabaseAnimation({
    path: src,
  })

  if (loading) {
    return <Spinner className={className} />
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <span className="text-red-500">Erro ao carregar animação</span>
      </div>
    )
  }

  return (
    <div style={style} className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[0, 10, 5]} intensity={1.5} />
          <hemisphereLight intensity={0.8} groundColor="#ffffff" />
          <Model url={url} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  )
}
