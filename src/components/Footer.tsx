import React from "react";
import SocialIcons from "./SocialIcons";

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
          <SocialIcons iconSize="lg" />
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
  );
};

export default Footer;
