import React, { useState } from "react";
import { Globe, ChevronDown, User } from "lucide-react";

interface HeaderProps {
  isScrolled: boolean;
  setActiveModal: (id: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, setActiveModal }) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* <a href="/" className="text-2xl font-bold">
          Home
        </a> */}

        {/* <nav className={`header-menu`}>
          <ul className="flex space-x-6 items-center">
            <li className="relative">
              <button 
                className="flex items-center space-x-1 menu-item"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <Globe className="h-4 w-4 mr-1" />
                <span>Português</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg py-2 w-40 text-gray-800 z-50">
                  <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer font-medium text-primary-color hover:pl-6 transition-all">Português</div>
                  <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer hover:pl-6 transition-all">English</div>
                  <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer hover:pl-6 transition-all">Español</div>
                  <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer hover:pl-6 transition-all">Deutsch</div>
                  <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer hover:pl-6 transition-all">Français</div>
                </div>
              )}
            </li>
            <li>
              <button 
                className="flex items-center space-x-1 menu-item"
                onClick={() => setActiveModal('login-modal')}
              >
                <User className="h-4 w-4 mr-1" />
                <span>Login</span>
              </button>
            </li>
          </ul>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;
