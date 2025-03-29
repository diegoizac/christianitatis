import React, { useEffect, useState, Suspense, lazy } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
// import CenteredThreeScene from './components/CenteredThreeScene';
import LeftMenu from "./components/LeftMenu";
import EventCard from "./components/EventCard";
import Animation from "./components/Animation";
import SocialIcons from "./components/SocialIcons";
import ContactForm from "./components/ContactForm";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";
import ErrorBoundary from "./components/ErrorBoundary";
import { useCache } from "./hooks/useCache";
import OptimizedImage from "./components/OptimizedImage";

// Lazy loading dos componentes principais
const HeaderLazy = lazy(() => import("./components/Header"));
const FooterLazy = lazy(() => import("./components/Footer"));
const EventList = lazy(() => import("./components/EventList"));
const ContactFormLazy = lazy(() => import("./components/ContactForm"));

function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Usando o hook de cache para os eventos
  const {
    data: events,
    loading: eventsLoading,
    error: eventsError,
  } = useCache(
    async () => {
      // Simulando uma chamada à API
      return [
        {
          imageUrl: "./assets/images/nick-brasilia.png",
          title: "15/04 - Brasília",
          location: "Campus Arena da Sara Nossa Terra",
          address: "Quadra 02, Com. 11, Lote 01, Vicente Pires, DF.",
          time: "19H",
          info: "@copevdf",
        },
        {
          imageUrl: "./assets/images/nick-goiania.png",
          title: "16/04 - Goiânia",
          location: "Arena Videira Bueno",
          address: "Av. T-7, 1361, Goiânia, GO.",
          time: "19H",
          info: "(062) 3251-0505",
        },
        {
          imageUrl: "./assets/images/nick-ponta-grossa.png",
          title: "17/04 - Ponta Grossa",
          location: "Centro de Convenções do Avivamento",
          address: "Av. Maria Rita Perpétuo da Cruz S/N, Ponta Grossa, PR.",
          time: "19H",
          info: "(042) 3223-7870",
          videoUrl: "/assets/videos/video-nick-ponta-grossa.mp4",
        },
        {
          imageUrl: "./assets/images/nick-belo-horizonte.png",
          title: "18/04 - Belo Horizonte",
          location: "Igreja Batista Getsêmani",
          address: "Rua Cassiano Campolina 360, Belo Horizonte, MG.",
          time: "19H",
          info: "(031) 3448-9898",
        },
        {
          imageUrl: "./assets/images/nick-belem.png",
          title: "20/04 - Belém",
          location: "Catedral da Família Foursquare",
          address: "Tv Barão de Igarapé Mirim 977, Guamá, Belém, PA.",
          time: "18H",
          info: "(091) 99981-2091",
          videoUrl: "/assets/videos/video-nick-belem.mp4",
        },
      ];
    },
    { key: "events", ttl: 3600 }
  );

  const cityEvents = [
    {
      city: "Ponta Grossa",
      videoUrl: "/assets/videos/video-nick-ponta-grossa.mp4",
      post: "Evento incrível em Ponta Grossa!",
    },
    {
      city: "Belém",
      videoUrl: "/assets/videos/video-nick-belem.mp4",
      post: "Não perca o evento em Belém!",
    },
    // Adicione mais eventos conforme necessário
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in")
      .forEach((element) => {
        observer.observe(element);
      });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelectorAll(
          ".fade-in, .slide-in-left, .slide-in-right, .scale-in"
        )
        .forEach((element) => {
          observer.unobserve(element);
        });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Função para validar o email
  const validateEmail = (email: string) => {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  };

  // Modificar a função de envio do formulário para incluir a lógica de envio
  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrorMessage("Insira um email válido. O campo é obrigatório.");
      return;
    }
    setErrorMessage("");

    // Exemplo de envio de dados para uma API fictícia
    try {
      const response = await fetch("https://api.exemplo.com/enviar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          // Adicione outros campos do formulário aqui
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar o formulário");
      }

      alert("Formulário enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      setErrorMessage(
        "Erro ao enviar o formulário. Tente novamente mais tarde."
      );
    }
  };

  const handleFormSuccess = () => {
    toast.success("Mensagem enviada com sucesso!");
    setActiveModal(null);
  };

  const handleFormError = (error: string) => {
    toast.error(error);
  };

  return (
    <ErrorBoundary>
      <div className="main-container bg-gray-100 relative min-h-screen">
        <ToastContainer position="top-right" autoClose={5000} />
        <Suspense fallback={<Loading />}>
          <HeaderLazy isScrolled={isScrolled} setActiveModal={setActiveModal} />
          <main className="flex flex-grow pt-16">
            <LeftMenu setActiveModal={setActiveModal} />
            <div className="flex items-center justify-center flex-grow">
              <Animation
                style={{ position: "absolute", inset: 0, objectFit: "cover" }}
              />
            </div>
          </main>
          <FooterLazy setActiveModal={setActiveModal} />
        </Suspense>

        {/* Modals */}
        <Suspense fallback={<Loading />}>
          <Modal
            id="eventos-modal"
            isOpen={activeModal === "eventos-modal"}
            onClose={() => setActiveModal(null)}
            title="Eventos"
          >
            <div className="modal-content-inner">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Próximos Eventos
              </h2>

              {/* Banner principal com OptimizedImage */}
              <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                <OptimizedImage
                  src="/assets/images/todos-eventos.jpeg"
                  alt="Todos os eventos"
                  width={800}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              {/* Grid de eventos */}
              {eventsLoading ? (
                <Loading />
              ) : eventsError ? (
                <div className="text-red-500">
                  Erro ao carregar eventos. Tente novamente mais tarde.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events?.map((event, index) => (
                    <EventCard
                      key={index}
                      {...event}
                      onClick={() => {
                        if (event.videoUrl) {
                          // Lógica para abrir o vídeo
                          window.open(event.videoUrl, "_blank");
                        }
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </Modal>

          <Modal
            id="apoie-modal"
            isOpen={activeModal === "apoie-modal"}
            onClose={() => setActiveModal(null)}
            title="Apoie o Movimento"
          >
            <div className="modal-content-inner">
              <h2 className="text-2xl font-bold mb-4">APOIE-NOS</h2>
              <h3 className="text-xl font-semibold mb-2">
                Como Você Pode Ajudar
              </h3>
              <p className="mb-4">
                Sua contribuição é essencial para continuarmos nosso trabalho.
                Apoie-nos com doações ou participando dos nossos eventos!
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                Doações via PIX
              </h3>
              <div className="pix-info-placeholder mb-4 p-4 border rounded-lg">
                {/*  QR Code Image Placeholder */}
                <div className="text-center">
                  <img
                    className="inline"
                    src="./assets/images/PIX-Christianitatis.png"
                    alt="pix"
                  />
                </div>
                <p className="text-center mt-4 text-sm text-gray-600">
                  Banco: 033 | Agência: 3477 | Conta: 13011157-8
                  <br />
                  CNPJ: 18.900.689/0001-76
                  <br />
                  Favorecido: ASSOCIAÇÃO CHRISTIANITATIS
                </p>
              </div>
            </div>
          </Modal>

          <Modal
            id="contato-modal"
            isOpen={activeModal === "contato-modal"}
            onClose={() => setActiveModal(null)}
            title="Contato"
          >
            <ContactFormLazy
              onSuccess={handleFormSuccess}
              onError={handleFormError}
            />
          </Modal>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
