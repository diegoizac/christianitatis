import { create } from 'zustand'

interface AnimationStore {
  isRotating: boolean
  setRotating: (rotating: boolean) => void
  rotationSpeed: number
  setRotationSpeed: (speed: number) => void
  showAnimation: boolean
  setShowAnimation: (show: boolean) => void
}

export const useStore = create<AnimationStore>(set => ({
  isRotating: true,
  setRotating: (rotating: boolean) => set({ isRotating: rotating }),
  rotationSpeed: 0.3,
  setRotationSpeed: (speed: number) => set({ rotationSpeed: speed }),
  showAnimation: false,
  setShowAnimation: (show) => set({ showAnimation: show })
}))
