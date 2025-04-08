import { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { Button } from '../Button'
import OptimizedImage from '@/components/OptimizedImage'

interface HeaderProps {
  onOpenAuth?: () => void
  isScrolled?: boolean
}

export function Header({ onOpenAuth, isScrolled }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleAuthClick = () => {
    onOpenAuth?.()
    setIsMenuOpen(false)
  }

  return (
    <header
      className={clsx(
        'header fixed w-full top-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-md' : 'bg-blue-900/95',
        isMenuOpen && 'menu-open'
      )}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center space-x-3">
          <OptimizedImage
            src="/images/logo-main.png"
            alt="Christianitatis"
            width={120}
            height={40}
            className="h-10 w-auto transition-transform duration-300 hover:scale-105"
            loading="eager"
          />
          <span
            className={clsx(
              'text-2xl font-bold transition-colors duration-300',
              isScrolled ? 'text-gray-800' : 'text-white'
            )}
          >
            Christianitatis
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={clsx(
              'transition-colors duration-300 hover:text-gray-800',
              isScrolled ? 'text-gray-600' : 'text-white'
            )}
          >
            Início
          </Link>
          <Link
            to="/sobre"
            className={clsx(
              'transition-colors duration-300 hover:text-gray-800',
              isScrolled ? 'text-gray-600' : 'text-white'
            )}
          >
            Sobre
          </Link>
          <Link
            to="/contato"
            className={clsx(
              'transition-colors duration-300 hover:text-gray-800',
              isScrolled ? 'text-gray-600' : 'text-white'
            )}
          >
            Contato
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant={isScrolled ? 'outline' : 'ghost'} onClick={handleAuthClick}>
            Entrar
          </Button>
          <Button variant={isScrolled ? 'primary' : 'white'} onClick={handleAuthClick}>
            Cadastrar
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
          <span className="sr-only">Menu</span>
          <svg
            className={clsx(
              'h-6 w-6 transition-colors duration-300',
              isScrolled ? 'text-gray-800' : 'text-white'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
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
              <Button variant="outline" className="w-full" onClick={handleAuthClick}>
                Entrar
              </Button>
              <Button variant="primary" className="w-full" onClick={handleAuthClick}>
                Cadastrar
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
