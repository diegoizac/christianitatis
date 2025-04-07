import React from 'react'
import { useLocation } from 'react-router-dom'
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa'

const FooterComponent = () => {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')

  const renderAdminFooter = () => (
    <footer className="w-full py-4 bg-white border-t border-gray-200 text-gray-600 text-xs">
      <div className="container mx-auto text-center">
        <p className="text-[0.6rem] sm:text-xs">
          © 2025 Christianitatis - Painel Administrativo |
          <a
            href="https://2dlcompany.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition ml-1"
          >
            2DL Company
          </a>
        </p>
      </div>
    </footer>
  )

  const renderMainFooter = () => (
    <footer className="footer text-black py-6 fixed bottom-0 w-full" id="row-footer">
      <div className="container mx-auto text-center">
        <div className="social-icons flex justify-center space-x-6 mb-4">
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/christianitatis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-blue-600"
            >
              <FaFacebook className="fa-lg" />
            </a>
            <a
              href="https://www.youtube.com/@christianitatis2106"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-red-600"
            >
              <FaYoutube className="fa-lg" />
            </a>
            <a
              href="https://www.instagram.com/christianitatis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-pink-600"
            >
              <FaInstagram className="fa-lg" />
            </a>
          </div>
        </div>
        <p className="text-[#1f2937] text-[0.5rem] md:text-base">
          © 2025 All Rights Reserved. Christianitatis |
          <a
            href="https://2dlcompany.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1f2937]"
          >
            Feito com <span className="text-[#3b82f6]">💙</span> por 2DL Company
          </a>
        </p>
      </div>
    </footer>
  )

  return isAdminPage ? renderAdminFooter() : renderMainFooter()
}

export default FooterComponent
