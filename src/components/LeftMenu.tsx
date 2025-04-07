import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

interface LeftMenuProps {
  setActiveModal: (modal: string | null) => void
}

const LeftMenu: React.FC<LeftMenuProps> = ({ setActiveModal }) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isAdminPage = location.pathname.startsWith('/admin')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleNavigation = (path: string) => {
    navigate(path)
    setIsOpen(false)
  }

  const handleModalOpen = (modalId: string) => {
    setIsOpen(false)
    setTimeout(() => {
      setActiveModal(modalId)
    }, 300)
  }

  const renderAdminMenu = () => (
    <nav className="flex flex-col gap-4 px-4 pt-16">
      <button
        onClick={() => handleNavigation('/admin/dashboard')}
        className="text-gray-600 hover:text-blue-600 transition text-left py-2"
      >
        Dashboard
      </button>
      <button
        onClick={() => handleNavigation('/admin/users')}
        className="text-gray-600 hover:text-blue-600 transition text-left py-2"
      >
        Usuários
      </button>
      <button
        onClick={() => handleNavigation('/admin/events')}
        className="text-gray-600 hover:text-blue-600 transition text-left py-2"
      >
        Eventos
      </button>
    </nav>
  )

  const renderMainMenu = () => (
    <nav className="flex flex-col gap-4 px-4 pt-16">
      <button
        onClick={() => handleNavigation('/events')}
        className="text-gray-600 hover:text-blue-600 transition text-left py-2"
      >
        Eventos
      </button>
      <button
        onClick={() => handleModalOpen('support')}
        className="text-gray-600 hover:text-blue-600 transition text-left py-2"
      >
        Apoie o Movimento
      </button>
      <button
        onClick={() => handleModalOpen('contact')}
        className="text-gray-600 hover:text-blue-600 transition text-left py-2"
      >
        Contato
      </button>
    </nav>
  )

  return (
    <>
      {/* Botão do menu */}
      <div className="fixed top-[4.5rem] left-4 z-[60] flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white shadow-md hover:bg-gray-100 transition"
          aria-label="Toggle menu"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[45]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[50] transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-20" /> {/* Espaço para o header */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-24 right-4 p-2 text-gray-600 hover:text-blue-600 transition"
          aria-label="Fechar menu"
        >
          <FiX size={24} />
        </button>
        {isAdminPage ? renderAdminMenu() : renderMainMenu()}
      </div>
    </>
  )
}

export default LeftMenu
