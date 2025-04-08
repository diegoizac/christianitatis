import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/store'
import { Animation } from '../../components/Animation'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const setShowAnimation = useStore(state => state.setShowAnimation)

  useEffect(() => {
    setShowAnimation(true)
    setIsLoading(false)
    return () => setShowAnimation(false)
  }, [setShowAnimation])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Bem-vindo à Christianitatis</h1>
            <p className="text-lg mb-6">Explore nossa coleção de eventos e conteúdo católico</p>
            <Link
              to="/eventos"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver Eventos
            </Link>
          </div>
          <div className="h-96 relative">
            <Animation src="animations/logo-3d-christianitatisv002.glb" />
          </div>
        </div>
      </div>
    </div>
  )
}
