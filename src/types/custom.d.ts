declare module '@react-three/postprocessing' {
  import { ReactNode } from 'react'

  export const EffectComposer: React.FC<{ children: ReactNode }>
  export const Bloom: React.FC<{
    intensity?: number
    luminanceThreshold?: number
    luminanceSmoothing?: number
  }>
  export const ChromaticAberration: React.FC<{
    offset?: [number, number]
  }>
}

declare module 'r3f-perf' {
  import { ReactNode } from 'react'

  export const Perf: React.FC<{
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  }>
}

declare module 'react-three-gui' {
  export function useControls<T>(config: {
    [key: string]: {
      value: number
      min: number
      max: number
    }
  }): T
}

declare module '@react-spring/three' {
  import { SpringValue, AnimatedComponent } from '@react-spring/web'
  import { Group } from 'three'

  export * from '@react-spring/web'

  export const animated: {
    group: AnimatedComponent<typeof Group>
  }

  export interface SpringValues<T> {
    position: SpringValue<[number, number, number]>
    rotation: SpringValue<[number, number, number]>
  }

  export function useSpring<T>(config: {
    from?: {
      position?: [number, number, number]
      rotation?: [number, number, number]
    }
    to?: {
      position?: [number, number, number]
      rotation?: [number, number, number]
    }
    config?: {
      mass?: number
      tension?: number
      friction?: number
    }
  }): [SpringValues<T>, any]
}
