import React from 'react'
import { Link } from 'react-router-dom'

interface FooterProps {
  setActiveModal: (modal: string | null) => void
}

export const Footer: React.FC<FooterProps> = ({ setActiveModal }) => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Christianitatis</h3>
            <p className="text-gray-300">
              Movimento católico dedicado à formação e evangelização através da tradição e cultura
              da Igreja.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white">
                  Cadastre-se
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: contato@christianitatis.org</li>
              <li>Telefone: (11) 1234-5678</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                Instagram
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Christianitatis. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
