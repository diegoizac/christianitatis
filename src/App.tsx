import React, { useState, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import ContactForm from "./components/ContactForm";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";
import ErrorBoundary from "./components/ErrorBoundary";
import SocialIcons from "./components/SocialIcons";
import { routerConfig } from "./router/config";

// Lazy loading para as páginas
const Home = React.lazy(() => import("./pages/Home"));
const EventDetails = React.lazy(() => import("./pages/EventDetails"));

function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormSuccess = () => {
    toast.success("Mensagem enviada com sucesso!");
    setActiveModal(null);
  };

  const handleFormError = (error: string) => {
    toast.error(error);
  };

  return (
    <Router {...routerConfig}>
      <ErrorBoundary>
        <div className="main-container relative min-h-screen">
          <ToastContainer position="top-right" autoClose={5000} />
          <Suspense fallback={<Loading />}>
            <Header isScrolled={isScrolled} setActiveModal={setActiveModal} />
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<Loading />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="/evento/:eventId"
                element={
                  <Suspense fallback={<Loading />}>
                    <EventDetails />
                  </Suspense>
                }
              />
            </Routes>
            <Footer setActiveModal={setActiveModal} />
          </Suspense>

          {activeModal === "contact" && (
            <Modal
              id="contact-modal"
              isOpen={true}
              title="Contato"
              onClose={() => setActiveModal(null)}
            >
              <Suspense fallback={<Loading />}>
                <ContactForm
                  onSuccess={handleFormSuccess}
                  onError={handleFormError}
                />
              </Suspense>
            </Modal>
          )}

          <SocialIcons />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
