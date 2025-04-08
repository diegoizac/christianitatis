import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { SpotLight } from '@react-three/drei'
import * as THREE from 'three'
import { Group } from 'three'

interface MovingSpotProps {
  color: string
  position: [number, number, number]
  depthBuffer: THREE.DepthTexture
}

export function MovingSpot({ color, position, depthBuffer }: MovingSpotProps) {
  const light = useRef<THREE.SpotLight>(null)
  const targetRef = useRef<Group>(null)

  useFrame(state => {
    if (light.current && targetRef.current) {
      const time = state.clock.elapsedTime
      const x = position[0] + Math.sin(time * 0.7) * 0.4
      const y = position[1] + Math.cos(time * 0.5) * 0.2
      const z = position[2]

      light.current.position.set(x, y, z)
      targetRef.current.position.set(x, y - 1, z - 1)
    }
  })

  return (
    <>
      <SpotLight
        ref={light}
        penumbra={1}
        distance={6}
        angle={0.35}
        attenuation={5}
        anglePower={4}
        intensity={2}
        color={color}
        position={position}
        target={targetRef.current || undefined}
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.0001}
        depthBuffer={depthBuffer}
      />
      <group ref={targetRef} position={[position[0], position[1] - 1, position[2] - 1]} />
    </>
  )
}
