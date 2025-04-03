import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Share2,
  Home,
  ChevronDown,
  MessageCircle,
  Menu,
  X,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Tree3D from "./Tree3D";

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Nick Vujicic - Tour Brasil 2024",
          text: "Uma experiência única de superação, fé e inspiração. Participe desta jornada transformadora por várias cidades do Brasil.",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Erro ao compartilhar:", error);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0F1C] px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      {/* Menu Lateral */}
      <div className="fixed left-0 top-0 h-full z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute top-4 left-4 bg-[#9333EA] p-2 rounded-full text-white hover:bg-[#7928CA] transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`bg-[#0A0F1C] border-r border-gray-800 h-full w-64 transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 px-4">
            <div className="flex-1 space-y-4">
              <button className="flex items-center space-x-3 text-white hover:text-[#9333EA] transition-colors w-full p-2 rounded-lg hover:bg-white/5">
                <Heart size={20} />
                <span>Favoritos</span>
              </button>
              <button className="flex items-center space-x-3 text-white hover:text-[#9333EA] transition-colors w-full p-2 rounded-lg hover:bg-white/5">
                <Settings size={20} />
                <span>Configurações</span>
              </button>
              <button className="flex items-center space-x-3 text-white hover:text-[#9333EA] transition-colors w-full p-2 rounded-lg hover:bg-white/5">
                <HelpCircle size={20} />
                <span>Ajuda</span>
              </button>
            </div>
            <button className="flex items-center space-x-3 text-white hover:text-[#9333EA] transition-colors w-full p-2 rounded-lg hover:bg-white/5 mb-8">
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-start justify-center h-[calc(100vh-200px)]">
          <h1 className="text-6xl font-bold text-white mb-4">Nick Vujicic</h1>
          <h2 className="text-6xl font-bold text-[#9333EA] mb-8">
            Tour Brasil 2024
          </h2>
          <p className="text-white text-xl max-w-2xl mb-8">
            Uma experiência única de superação, fé e inspiração. Participe desta
            jornada transformadora por várias cidades do Brasil.
          </p>

          <div className="grid grid-cols-4 gap-8 mb-12">
            <div className="flex items-center space-x-2 text-white">
              <Calendar className="h-6 w-6 text-[#9333EA]" />
              <span>Abril 2024</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <MapPin className="h-6 w-6 text-[#9333EA]" />
              <span>5 Cidades</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Clock className="h-6 w-6 text-[#9333EA]" />
              <span>19h00</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 text-white hover:text-[#9333EA] transition-colors"
            >
              <Share2 className="h-6 w-6 text-[#9333EA]" />
              <span>Compartilhe</span>
            </button>
          </div>

          <div className="flex space-x-4 mb-12">
            <button className="bg-[#9333EA] hover:bg-[#7928CA] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
              Ver Eventos
            </button>
            <button className="border-2 border-[#9333EA] text-[#9333EA] hover:bg-[#9333EA] hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
              Saiba Mais
            </button>
          </div>

          <div className="flex items-center space-x-2 text-gray-400">
            <div className="w-12 h-1 bg-[#9333EA]"></div>
            <span>Role para ver mais</span>
          </div>
        </div>
      </div>

      {/* Árvore 3D */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-96 h-96">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <OrbitControls enableZoom={false} />
          <Tree3D />
        </Canvas>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0A0F1C] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="bg-white p-2 rounded-full">
              <Home className="h-5 w-5 text-[#9333EA]" />
            </button>
          </div>

          <div className="flex items-center space-x-6">
            <button className="flex items-center text-white hover:text-[#9333EA] transition-colors">
              Personal <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <button className="flex items-center text-white hover:text-[#9333EA] transition-colors">
              Business
            </button>
            <button className="flex items-center text-white hover:text-[#9333EA] transition-colors">
              Company <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>

          <button className="p-2 text-[#9333EA] hover:text-white transition-colors">
            <MessageCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
