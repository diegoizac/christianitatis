import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { NotificationCenter } from '@/components/NotificationCenter'
import logoMain from '@/assets/images/logo-main.png'

interface HeaderProps {
  isScrolled: boolean
}

export function Header({ isScrolled }: HeaderProps): JSX.Element {
  const { user, signOut } = useAuth()

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white ${isScrolled ? 'shadow' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src={logoMain} alt="Christianitatis" className="h-12 w-auto" />
          </Link>

          <nav className="flex items-center space-x-4">
            {user && (
              <>
                <Link to="/events/new" className="text-gray-600 hover:text-gray-900">
                  Novo Evento
                </Link>

                {/* Menu Admin */}
                <div className="relative group">
                  <button className="text-gray-600 hover:text-gray-900">Admin</button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link
                      to="/admin/events/approval"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Aprovar Eventos
                    </Link>
                    <Link
                      to="/admin/users"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Gerenciar Usuários
                    </Link>
                  </div>
                </div>

                <NotificationCenter />

                <button onClick={signOut} className="text-gray-600 hover:text-gray-900">
                  Sair
                </button>
              </>
            )}

            {!user && (
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Entrar
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
