import React, { useState, useEffect } from 'react'
import { Home, ChevronDown, ChevronRight, MessageCircle } from 'lucide-react'

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Add animation on component mount
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className={`text-white transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl font-bold leading-tight">
              One app<br />for all needs
            </h1>
            <p className="mt-6 text-xl">
              Single account for all your payments.
            </p>
            
            <div className="mt-8 flex space-x-4">
              <a href="#" className="app-store-button flex items-center px-4 py-2 rounded-lg">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" className="h-6 mr-2" />
                <div>
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              
              <a href="#" className="app-store-button flex items-center px-4 py-2 rounded-lg">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" alt="Google Play" className="h-6 mr-2" />
                <div>
                  <div className="text-xs opacity-80">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
            
            <div className="mt-4 text-sm text-white opacity-70 flex items-center">
              <span className="mr-2">Scroll</span>
              <div className="w-1 h-4 bg-white scroll-indicator"></div>
            </div>
          </div>
          
          <div className={`hidden lg:block transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <img 
              src="https://images.unsplash.com/photo-1633355444132-695d5876cd00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="3D discs illustration" 
              className="w-full animate-float"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bottom-nav flex items-center px-2 py-2 relative">
          <button 
            className="flex items-center justify-center bg-white text-red-500 p-2 rounded-full hover:bg-red-50 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Home className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-1 px-4">
            <div className="relative">
              <button className="flex items-center text-white px-3 py-1 hover:bg-white hover:bg-opacity-10 rounded-full transition-all">
                Personal <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="relative">
              <button className="flex items-center text-white px-3 py-1 hover:bg-white hover:bg-opacity-10 rounded-full transition-all">
                Business <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="relative">
              <button className="flex items-center text-white px-3 py-1 hover:bg-white hover:bg-opacity-10 rounded-full transition-all">
                Company <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="dropdown-menu absolute left-0 mt-2 p-4 w-48 text-white">
            <div className="py-1 hover:pl-2 transition-all cursor-pointer">About</div>
            <div className="py-1 hover:pl-2 transition-all cursor-pointer">Newsroom</div>
            <div className="py-1 hover:pl-2 transition-all cursor-pointer">Partnerships</div>
            <div className="py-1 hover:pl-2 transition-all cursor-pointer">Media Assets</div>
          </div>
        )}
      </div>
      
      {/* Chat Button */}
      <button className="absolute bottom-8 right-8 bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition-all animate-pulse-slow">
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  )
}

export default Hero
