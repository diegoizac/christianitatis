import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useLocation } from 'react-router-dom'

interface HeaderProps {
  isScrolled: boolean
  setActiveModal: (modal: string | null) => void
  onOpenAuth?: () => void
}

const Header: React.FC<HeaderProps> = ({ isScrolled, setActiveModal, onOpenAuth }) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  if (isAdminPage) {
    return (
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {user && (
              <button
                onClick={() => handleNavigation('/minha-conta')}
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Minha Conta
              </button>
            )}
          </nav>
        </div>
      </header>
    )
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 w-auto cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => setActiveModal('contact')}
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Contato
          </button>
          <button
            onClick={() => setActiveModal('support')}
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Apoie
          </button>
          {user ? (
            <button
              onClick={() => handleNavigation('/minha-conta')}
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Minha Conta
            </button>
          ) : (
            <button onClick={onOpenAuth} className="text-gray-600 hover:text-blue-600 transition">
              Entrar
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
