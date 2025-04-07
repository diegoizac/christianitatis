import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import AuthModal from '../../components/AuthModal'
import Header from '../../components/Header'
import Animation from '../../components/Animation'

export const Home = () => {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authView, setAuthView] = useState<'login' | 'register'>('login')
  const [isScrolled, setIsScrolled] = useState(false)

  const handleOpenAuth = (view: 'login' | 'register') => {
    setAuthView(view)
    setShowAuthModal(true)
  }

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSetActiveModal = (modalId: string | null) => {
    if (modalId === 'auth-modal') {
      setShowAuthModal(true)
    }
  }

  return (
    <div className="min-h-screen relative">
      <Helmet>
        <title>Christianitatis - Início</title>
      </Helmet>

      <Header
        isScrolled={isScrolled}
        setActiveModal={handleSetActiveModal}
        onOpenAuth={handleOpenAuth}
        className="relative z-50"
      />

      <main className="absolute inset-0 z-0 pt-20">
        <Animation />
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialView={authView}
      />
    </div>
  )
}
