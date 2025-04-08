import React, { useState, useEffect, lazy, Suspense } from "react";
import Header from "../Header";
import Footer from "../Footer";
import LeftMenu from "../LeftMenu";
import SocialIcons from "../SocialIcons";
import ContactForm from "../features/Contact/ContactForm";
import Loading from "../ui/Loading";

// Lazy load da animação
const Animation = lazy(() => import("../Animation"));

interface HomeProps {
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
}

const Home: React.FC<HomeProps> = ({ activeModal, setActiveModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Pré-carrega o modelo 3D
    const preloadModel = async () => {
      try {
        await import("../Animation");
        setIsAnimationLoaded(true);
      } catch (error) {
        console.error("Erro ao carregar animação:", error);
      }
    };

    preloadModel();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isScrolled={isScrolled} setActiveModal={setActiveModal} />
      <LeftMenu setActiveModal={setActiveModal} />

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bem-vindo ao Christianitatis
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sua plataforma para eventos cristãos inspiradores
          </p>

          <Suspense
            fallback={
              <div className="h-[500px] flex items-center justify-center">
                <Loading />
              </div>
            }
          >
            {isAnimationLoaded && <Animation />}
          </Suspense>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative z-10">
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Eventos em Destaque
            </h2>
            <p className="text-gray-600">
              Descubra os próximos eventos em sua região
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Comunidade
            </h2>
            <p className="text-gray-600">
              Conecte-se com outros fiéis e compartilhe experiências
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Recursos
            </h2>
            <p className="text-gray-600">
              Acesse materiais e conteúdos exclusivos
            </p>
          </div>
        </section>

        <section className="mb-16">
          <ContactForm />
        </section>

        <div className="fixed bottom-4 right-4 z-50">
          <SocialIcons />
        </div>
      </main>

      <Footer setActiveModal={setActiveModal} />
    </div>
  );
};

export default Home;
