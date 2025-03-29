import React, { useEffect, useState, Suspense, lazy } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
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
          <main className="flex flex-col pt-16">
            <div className="flex">
              <LeftMenu setActiveModal={setActiveModal} />
              <div className="flex-grow">
                <div className="relative">
                  <Animation className="absolute inset-0 object-cover" />
                  <div className="relative z-10 p-4">
                    <Suspense fallback={<Loading />}>
                      <EventList
                        events={events || []}
                        loading={eventsLoading}
                        error={eventsError}
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <FooterLazy />
        </Suspense>

        {activeModal === "contact" && (
          <Modal onClose={() => setActiveModal(null)}>
            <Suspense fallback={<Loading />}>
              <ContactFormLazy
                onSuccess={handleFormSuccess}
                onError={handleFormError}
              />
            </Suspense>
          </Modal>
        )}

        <SocialIcons />
      </div>
    </ErrorBoundary>
  );
}

export default App;