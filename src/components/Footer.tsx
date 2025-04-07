import React from 'react'
import SocialIcons from './SocialIcons'

const Footer: React.FC = () => {
  return (
    <footer
      className="footer text-black py-6 bg-white border-t border-gray-200 mt-auto"
      id="row-footer"
    >
      <div className="container mx-auto text-center">
        <div className="social-icons flex justify-center space-x-6 mb-4">
          <SocialIcons iconSize="lg" />
        </div>
        <p className="text-[#1f2937] text-[0.5rem] md:text-base">
          © 2025 All Rights Reserved. Christianitatis |
          <a
            href="https://2dlcompany.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1f2937] hover:text-blue-600 transition-colors"
          >
            {' '}
            Feito com <span className="text-[#3b82f6]">💙</span> por 2DL Company
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
