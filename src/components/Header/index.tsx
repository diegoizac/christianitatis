import { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { Button } from '../Button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={clsx('header', isMenuOpen && 'menu-open')}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Christianitatis
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            Início
          </Link>
          <Link to="/sobre" className="text-gray-600 hover:text-gray-800">
            Sobre
          </Link>
          <Link to="/contato" className="text-gray-600 hover:text-gray-800">
            Contato
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost">Entrar</Button>
          <Button>Cadastrar</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
          <span className="sr-only">Menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
            <nav className="flex flex-col p-4 space-y-4">
              <Link to="/" className="text-gray-600 hover:text-gray-800">
                Início
              </Link>
              <Link to="/sobre" className="text-gray-600 hover:text-gray-800">
                Sobre
              </Link>
              <Link to="/contato" className="text-gray-600 hover:text-gray-800">
                Contato
              </Link>
              <Button variant="ghost" className="w-full">
                Entrar
              </Button>
              <Button className="w-full">Cadastrar</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
