import React from 'react'
import { Link } from 'react-router-dom'
import logoMain from '@/assets/images/logo-main.png'

export function Footer(): JSX.Element {
  return (
    <footer className="bg-white shadow mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img src={logoMain} alt="Christianitatis" className="h-12 w-auto" />
            </Link>
            <p className="text-gray-600 text-sm">
              Movimento dedicado à preservação e promoção da tradição católica.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-gray-600 hover:text-gray-900 text-sm">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-gray-900 text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault()
                    document.getElementById('apoie-modal')?.click()
                  }}
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Apoie o Movimento
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">
                <a href="mailto:contato@christianitatis.com" className="hover:text-gray-900">
                  contato@christianitatis.com
                </a>
              </li>
              <li className="text-gray-600 text-sm">CNPJ: 18.900.689/0001-76</li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/christianitatis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com/christianitatis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Christianitatis. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4">
            <Link to="/terms" className="text-gray-600 hover:text-gray-900 text-sm">
              Termos de Uso
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
