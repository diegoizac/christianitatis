import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User as UserIcon, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const UserMenu = () => {
  const { user, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  const displayName = user.user_metadata?.full_name || user.email
  const avatarUrl = user.user_metadata?.avatar_url

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {avatarUrl ? (
            <img src={avatarUrl} alt={displayName} className="h-full w-full object-cover" />
          ) : (
            <UserIcon className="h-5 w-5 text-gray-500" />
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">{displayName}</span>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <Link
          to="/profile"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          onClick={() => setIsOpen(false)}
        >
          <UserIcon className="mr-3 h-4 w-4" />
          Ver Perfil
        </Link>
        <Link
          to="/settings"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          onClick={() => setIsOpen(false)}
        >
          <Settings className="mr-3 h-4 w-4" />
          Configurações
        </Link>
        <button
          onClick={() => {
            setIsOpen(false)
            signOut()
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sair
        </button>
      </div>
    </div>
  )
}

export default UserMenu
