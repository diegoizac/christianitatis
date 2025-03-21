import React, { useState, useEffect } from "react";
import { Calendar, Heart, Mail, Menu } from "lucide-react";

interface LeftMenuProps {
  setActiveModal: (modalId: string | null) => void;
}

const LeftMenu: React.FC<LeftMenuProps> = ({ setActiveModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleMenuItemClick = (modalId: string) => {
    setActiveModal(modalId);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="left-menu-container relative">
      {isMobile && !isMenuOpen && (
        <button
          className="absolute top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      )}
      {/* Menu content - always visible on desktop, toggleable on mobile */}
      <nav
        className={`
          flex flex-col items-start justify-center py-8 px-4 h-screen
          fixed left-0 top-0 z-50 bg-transparent shadow-lg w-64 transform transition-transform duration-300 ease-in-out
          ${isMobile && !isMenuOpen ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        <ul className="space-y-6 w-full">
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 font-medium text-lg w-full bg-white bg-opacity-75 p-2 rounded-md shadow-md"
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick("eventos-modal");
              }}
            >
              <Calendar className="h-5 w-5 mr-2" />
              <span>Eventos</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 font-medium text-lg w-full bg-white bg-opacity-75 p-2 rounded-md shadow-md"
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick("apoie-modal");
              }}
            >
              <Heart className="h-5 w-5 mr-2" />
              <span>Apoie o Movimento</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 font-medium text-lg w-full bg-white bg-opacity-75 p-2 rounded-md shadow-md"
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick("contato-modal");
              }}
            >
              <Mail className="h-5 w-5 mr-2" />
              <span>Contato</span>
            </a>
          </li>
          {/* <li>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium text-lg w-full"
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick("login-modal");
              }}
            >
              <span>Login</span>
            </a>
          </li> */}
          {/* <li>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium text-lg w-full"
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick("idioma-modal");
              }}
            >
              <span>Idioma</span>
            </a>
          </li> */}
        </ul>
      </nav>
      {/* Botão para fechar o menu em mobile */}
      {isMobile && isMenuOpen && (
        <button
          className="fixed top-4 right-4 z-50 bg-white p-2 rounded-md shadow-md"
          onClick={() => setIsMenuOpen(false)}
        >
          X
        </button>
      )}
    </div>
  );
};

export default LeftMenu;
