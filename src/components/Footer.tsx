import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

interface FooterProps {
  setActiveModal: (modalId: string | null) => void;
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer
      className="footer text-black py-6 fixed bottom-0 w-full"
      id="row-footer"
    >
      <div className="container mx-auto text-center">
        <div className="social-icons flex justify-center space-x-6 mb-4">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/christianitatis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-blue-600 text-2xl animate fade-in animation-time-1s delay-08s hover:shadow-lg"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          {/* YouTube */}
          <a
            href="https://www.youtube.com/@christianitatis2106"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-red-600 text-2xl animate fade-in animation-time-1s delay-06s hover:shadow-lg"
          >
            <i className="fa-brands fa-youtube"></i>
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/christianitatis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-pink-600 text-2xl animate fade-in animation-time-1s delay-06s hover:shadow-lg"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
        <p style={{ color: "#1f2937" }}>
          © 2025 All Rights Reserved. Christianitatis |
          <a
            href="https://2dlcompany.com.br"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1f2937" }}
          >
            Feito com <span style={{ color: "#3b82f6" }}>💙</span> por 2DL
            Company
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
