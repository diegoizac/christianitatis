import React from "react";

interface FooterProps {
  setActiveModal: (modalId: string | null) => void;
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="text-white py-6 fixed bottom-0 w-full" id="row-footer">
      <div className="container mx-auto text-center">
        <div className="social-icons flex justify-center space-x-6 mb-4">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/christianitatis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white text-2xl animate fade-in animation-time-1s delay-08s"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          {/* YouTube */}
          <a
            href="https://www.youtube.com/@christianitatis2106"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white text-2xl animate fade-in animation-time-1s delay-06s"
          >
            <i className="fa-brands fa-youtube"></i>
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/christianitatis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white text-2xl animate fade-in animation-time-1s delay-06s"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
        <p className="text-gray-300">
          © 2025 All Rights Reserved. Christianitatis |
          <a
            href="https://2dlcompany.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 ml-1 animate fade-in animation-time-1s delay-1s"
          >
            Feito com 💙 por 2DL Company
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
