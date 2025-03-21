import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

interface SocialIconsProps {
  iconSize?: "lg" | "2x" | "1x" | "3x" | "4x";
}

const SocialIcons: React.FC<SocialIconsProps> = ({ iconSize = "2x" }) => {
  return (
    <div className="flex space-x-4">
      <a
        href="https://www.facebook.com/christianitatis"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-800 hover:text-blue-600"
      >
        <FontAwesomeIcon icon={faFacebook} size={iconSize} />
      </a>
      <a
        href="https://www.youtube.com/@christianitatis2106"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-800 hover:text-red-600"
      >
        <FontAwesomeIcon icon={faYoutube} size={iconSize} />
      </a>
      <a
        href="https://www.instagram.com/christianitatis"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-800 hover:text-pink-600"
      >
        <FontAwesomeIcon icon={faInstagram} size={iconSize} />
      </a>
    </div>
  );
};

export default SocialIcons;
