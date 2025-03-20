import React, { useEffect, useState, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
// import CenteredThreeScene from './components/CenteredThreeScene';
import LeftMenu from "./components/LeftMenu";
import EventCarousel from "./components/EventCarousel";
import EventCard from "./components/EventCard";
import Animation from "./components/Animation";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Importar Font Awesome para ícones

function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeEvent, setActiveEvent] = useState<{
    imageUrl: string;
    title: string;
    location: string;
    address: string;
    time: string;
    info: string;
    videoUrl?: string;
  } | null>(null);

  const featuredEvents = [
    {
      imageUrl: "./assets/images/banner-nick-ponta-grossa.png",
      title: "Destaque Ponta Grossa",
      eventPath: "/evento-pg",
      videoUrl: "/assets/videos/video-nick-ponta-grossa.mp4",
    },
    {
      imageUrl: "./assets/images/banner-nick-belem.png",
      title: "Destaque Belém",
      eventPath: "/evento-belem",
      videoUrl: "/assets/videos/video-nick-belem.mp4",
    },
  ];

  const events = [
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
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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

  // Modificar o EventCard para abrir o modal com detalhes
  const handleEventClick = (event: {
    imageUrl: string;
    title: string;
    location: string;
    address: string;
    time: string;
    info: string;
  }) => {
    setActiveEvent(event);
    setActiveModal("event-details-modal");
  };

  return (
    <div className="main-container bg-gray-100 relative min-h-screen">
      <Suspense fallback={<div>Carregando...</div>}>
        <Header isScrolled={isScrolled} setActiveModal={setActiveModal} />
        <main className="flex flex-grow pt-16">
          <LeftMenu setActiveModal={setActiveModal} />
          <div className="flex items-center justify-center flex-grow">
            <Animation
              style={{ position: "absolute", inset: 0, objectFit: "cover" }}
            />
          </div>
        </main>
        <Footer setActiveModal={setActiveModal} />
      </Suspense>

      {/* Modals */}
      <Modal
        id="eventos-modal"
        isOpen={activeModal === "eventos-modal"}
        onClose={() => setActiveModal(null)}
        title="Eventos"
      >
        <div className="modal-content-inner">
          <h2 className="text-2xl font-bold mb-4">Próximos Eventos</h2>
          {/* Event Carousel */}
          <EventCarousel events={featuredEvents} />

          {/* Adicionar vídeos e posts específicos para cada cidade */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Eventos por Cidade</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cityEvents.map(
                (
                  cityEvent: { city: string; videoUrl: string; post: string },
                  index: number
                ) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <h4 className="text-lg font-bold mb-2">{cityEvent.city}</h4>
                    <video controls className="w-full mb-2">
                      <source src={cityEvent.videoUrl} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                    <p>{cityEvent.post}</p>
                  </div>
                )
              )}
            </div>
          </div>

          <p className="mt-6">
            Aqui você encontra informações sobre os próximos eventos da
            Christianitatis.
          </p>
          {/* Event List */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event, index) => (
              <EventCard
                key={index}
                imageUrl={event.imageUrl}
                title={event.title}
                location={event.location}
                address={event.address}
                time={event.time}
                info={event.info}
                videoUrl={event.videoUrl}
                onClick={() => handleEventClick(event)}
              />
            ))}
          </div>
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
          <h3 className="text-xl font-semibold mb-2">Como Você Pode Ajudar</h3>
          <p className="mb-4">
            Sua contribuição é essencial para continuarmos nosso trabalho.
            Apoie-nos com doações ou participando dos nossos eventos!
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Doações via PIX</h3>
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
        <div className="modal-content-inner">
          <h2 className="text-2xl font-bold mb-4">Entre em Contato</h2>
          <p className="mb-4">
            Tem dúvidas, sugestões ou quer saber mais sobre a Christianitatis?
            Entre em contato conosco!
          </p>
          <form className="mb-6" onSubmit={handleContactFormSubmit}>
            <input type="text" placeholder="Seu Nome" className="form-input" />
            <input
              type="email"
              placeholder="Seu E-mail"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <input
              type="text"
              placeholder="Assunto da Mensagem"
              className="form-input"
            />
            <textarea
              placeholder="Sua Mensagem"
              className="form-input"
            ></textarea>
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </form>
          <h3 className="text-xl font-semibold mb-2">Contatos</h3>
          <p className="mb-4">
            <a href="mailto:info@christianitatis.org">
              info@christianitatis.org
            </a>
          </p>

          <h3 className="text-xl font-semibold mb-2">Social</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/christianitatis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a
              href="https://www.youtube.com/@christianitatis2106"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-800"
            >
              <i className="fab fa-youtube fa-lg"></i>
            </a>
            <a
              href="https://www.instagram.com/christianitatis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800"
            >
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
      </Modal>

      <Modal
        id="video-modal"
        isOpen={activeModal === "video-modal"}
        onClose={() => {
          setActiveModal(null);
          setVideoUrl(null);
        }}
        title=""
      >
        <div className="modal-content-inner relative">
          {videoUrl && (
            <video controls autoPlay className="w-full h-auto">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </Modal>

      <Modal
        id="event-details-modal"
        isOpen={activeModal === "event-details-modal"}
        onClose={() => setActiveModal(null)}
        title={activeEvent?.title || "Detalhes do Evento"}
      >
        {activeEvent && (
          <div className="modal-content-inner">
            {activeEvent.videoUrl ? (
              <video controls autoPlay className="w-full h-auto mb-4">
                <source src={activeEvent.videoUrl} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            ) : (
              <img
                src={activeEvent.imageUrl}
                alt={activeEvent.title}
                className="w-full h-auto object-contain mb-4"
              />
            )}
            <p>
              <strong>Local:</strong> {activeEvent.location}
            </p>
            <p>
              <strong>Endereço:</strong> {activeEvent.address}
            </p>
            <p>
              <strong>Horário:</strong> {activeEvent.time}
            </p>
            <p>
              <strong>Informações:</strong> {activeEvent.info}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
