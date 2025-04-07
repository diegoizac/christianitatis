import React, { useState } from 'react'
import { Globe, ChevronDown, User, LogOut, Calendar } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface HeaderProps {
  isScrolled: boolean
  setActiveModal: (modalId: string | null) => void
  onOpenAuth: (view: 'login' | 'register') => void
}

const Header: React.FC<HeaderProps> = ({ isScrolled, setActiveModal, onOpenAuth }) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/images/logo-main.png" alt="Logo Christianitatis" className="h-12 w-auto" />
          </Link>

          {/* Menu e Botões */}
          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-4">
              <Link
                to="/events"
                className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Eventos
              </Link>
              <button
                onClick={() => setActiveModal('apoie-modal')}
                className="bg-white text-red-500 px-4 py-2 rounded-full font-medium hover:bg-gray-100 hover:shadow-lg transition-all"
              >
                Apoie
              </button>
              <button
                onClick={() => setActiveModal('contato-modal')}
                className="bg-white text-red-500 px-4 py-2 rounded-full font-medium hover:bg-gray-100 hover:shadow-lg transition-all"
              >
                Contato
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/dashboard"
                    className="bg-white text-red-500 px-4 py-2 rounded-full font-medium hover:bg-gray-100 hover:shadow-lg transition-all flex items-center"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-red-500 px-4 py-2 rounded-full font-medium hover:bg-gray-100 hover:shadow-lg transition-all flex items-center"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onOpenAuth('login')}
                  className="bg-white text-red-500 px-4 py-2 rounded-full font-medium hover:bg-gray-100 hover:shadow-lg transition-all flex items-center"
                >
                  <User className="h-5 w-5 mr-2" />
                  Entrar
                </button>
              )}

              <div className="relative">
                <button
                  className="flex items-center bg-white text-red-500 px-4 py-2 rounded-full font-medium hover:bg-gray-100 hover:shadow-lg transition-all"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                >
                  <Globe className="h-5 w-5 mr-2" />
                  <span>PT</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>

                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-2 w-40 text-gray-800 z-50">
                    <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer font-medium text-red-500 hover:pl-6 transition-all">
                      Português
                    </div>
                    <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer hover:pl-6 transition-all">
                      English
                    </div>
                    <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer hover:pl-6 transition-all">
                      Español
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
