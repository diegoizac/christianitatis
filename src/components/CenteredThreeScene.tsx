import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface LoadingProgress {
  loaded: number
  total: number
}

const CenteredThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const modelRef = useRef<THREE.Group | null>(null)
  const frameIdRef = useRef<number>(0)

  useEffect(() => {
    if (!mountRef.current) return

    // Configuração da cena
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0xf3f4f6)

    // Configuração da câmera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    cameraRef.current = camera
    camera.position.set(0, 2, 5)

    // Configuração do renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    rendererRef.current = renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limita para melhor performance
    renderer.outputColorSpace = THREE.SRGBColorSpace // Substitui outputEncoding
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mountRef.current.appendChild(renderer.domElement)

    // Adicionar OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controlsRef.current = controls
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.5
    controls.enableZoom = true
    controls.minDistance = 3
    controls.maxDistance = 10
    controls.target.set(0, 0, 0)

    // Luzes
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    scene.add(directionalLight)

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5)
    backLight.position.set(-5, 5, -5)
    scene.add(backLight)

    // Carregar o modelo GLB
    const loader = new GLTFLoader()
    loader.load(
      '/src/assets/animations/arvore-logo-3d-christianitatisv0001.glb',
      (gltf: GLTF) => {
        const model = gltf.scene
        modelRef.current = model

        // Habilitar sombras para todos os objetos do modelo
        model.traverse(node => {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true
            node.receiveShadow = true
          }
        })

        // Centralizar o modelo
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center)

        // Ajustar escala se necessário
        const scale = 1.5
        model.scale.set(scale, scale, scale)

        scene.add(model)

        // Ajustar controles para o centro do modelo
        controls.target.copy(model.position)
        controls.update()
      },
      (progress: LoadingProgress) => {
        console.log('Loading model:', (progress.loaded / progress.total) * 100 + '%')
      },
      (error: unknown) => {
        console.error('Error loading model:', error)
      }
    )

    // Função de animação
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate)

      if (modelRef.current) {
        modelRef.current.rotation.y += 0.002
      }

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Ajustar tamanho ao redimensionar a janela
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return

      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameIdRef.current)

      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }

      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />
}

export default CenteredThreeScene
