import React, { useState, useEffect } from 'react'
import { Globe, ChevronDown } from 'lucide-react'

const Navbar = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Add animation on component mount
    setIsVisible(true);
  }, []);

  return (
    <nav className={`pt-4 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="#" className="text-white text-3xl font-bold hover:text-opacity-90 transition-all">Christianitatis</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                className="flex items-center space-x-1 text-white bg-white bg-opacity-10 px-4 py-2 rounded-full hover:bg-opacity-20 transition-all"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <Globe className="h-5 w-5" />
                <span>EN</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute bottom-full mb-2 bg-white rounded-lg shadow-lg py-2 w-40 text-gray-800 z-50">
                  <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer font-medium text-red-500 hover:pl-6 transition-all">English</div>
                  <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer hover:pl-6 transition-all">Deutsch</div>
                  <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer hover:pl-6 transition-all">Español</div>
                  <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer hover:pl-6 transition-all">Português</div>
                  <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer hover:pl-6 transition-all">Russian</div>
                  <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer hover:pl-6 transition-all">日本語</div>
                </div>
              )}
            </div>
            
            <a href="#" className="text-white hover:text-gray-200 transition-all">
              Log in
            </a>
            
            <a href="#" className="bg-white text-red-500 px-4 py-2 rounded-full font-medium hover:bg-gray-100 hover:shadow-lg transition-all">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
