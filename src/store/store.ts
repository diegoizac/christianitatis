import { create } from 'zustand'

interface AnimationStore {
  isRotating: boolean
  setRotating: (rotating: boolean) => void
  rotationSpeed: number
  setRotationSpeed: (speed: number) => void
}

export const useStore = create<AnimationStore>(set => ({
  isRotating: true,
  setRotating: (rotating: boolean) => set({ isRotating: rotating }),
  rotationSpeed: 0.3,
  setRotationSpeed: (speed: number) => set({ rotationSpeed: speed }),
}))
