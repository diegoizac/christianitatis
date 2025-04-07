import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Modal from './components/Modal'
// import CenteredThreeScene from './components/CenteredThreeScene';
import LeftMenu from './components/LeftMenu'
import EventList from './components/EventList'
import EventCard from './components/EventCard'
import Animation from './components/Animation'
import SocialIcons from './components/SocialIcons'
import ContactForm from './components/ContactForm'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from './components/Loading'
import ErrorBoundary from './components/ErrorBoundary'
import OptimizedImage from './components/OptimizedImage'
import { events } from './data/events'

function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const cityEvents = [
    {
      city: 'Ponta Grossa',
      videoUrl: '/assets/videos/video-nick-ponta-grossa.mp4',
      post: 'Evento incrível em Ponta Grossa!',
    },
    {
      city: 'Belém',
      videoUrl: '/assets/videos/video-nick-belem.mp4',
      post: 'Não perca o evento em Belém!',
    },
    // Adicione mais eventos conforme necessário
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document
      .querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in')
      .forEach(element => {
        observer.observe(element)
      })

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      document
        .querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in')
        .forEach(element => {
          observer.unobserve(element)
        })
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Função para validar o email
  const validateEmail = (email: string) => {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    return re.test(email)
  }

  // Modificar a função de envio do formulário para incluir a lógica de envio
  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setErrorMessage('Insira um email válido. O campo é obrigatório.')
      return
    }
    setErrorMessage('')

    // Exemplo de envio de dados para uma API fictícia
    try {
      const response = await fetch('https://api.exemplo.com/enviar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          // Adicione outros campos do formulário aqui
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar o formulário')
      }

      alert('Formulário enviado com sucesso!')
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error)
      setErrorMessage('Erro ao enviar o formulário. Tente novamente mais tarde.')
    }
  }

  const handleFormSuccess = () => {
    toast.success('Mensagem enviada com sucesso!')
    setActiveModal(null)
  }

  const handleFormError = (error: string) => {
    toast.error(error)
  }

  return (
    <ErrorBoundary>
      <div className="main-container bg-gray-100 relative min-h-screen">
        <ToastContainer position="top-right" autoClose={5000} />
        <Header isScrolled={isScrolled} setActiveModal={setActiveModal} />
        <main className="flex flex-grow pt-16">
          <LeftMenu setActiveModal={setActiveModal} />
          <div className="flex items-center justify-center flex-grow">
            <Animation style={{ position: 'absolute', inset: 0, objectFit: 'cover' }} />
          </div>
        </main>
        <Footer setActiveModal={setActiveModal} />

        {/* Modals */}
        <Modal
          id="eventos-modal"
          isOpen={activeModal === 'eventos-modal'}
          onClose={() => setActiveModal(null)}
          title="Eventos"
        >
          <div className="modal-content-inner">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Próximos Eventos</h2>

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
            <EventList
              title="Próximos Eventos"
              subtitle="Confira nossa agenda de eventos"
              events={events}
            />
          </div>
        </Modal>

        <Modal
          id="apoie-modal"
          isOpen={activeModal === 'apoie-modal'}
          onClose={() => setActiveModal(null)}
          title="Apoie o Movimento"
        >
          <div className="modal-content-inner">
            <h2 className="text-2xl font-bold mb-4">APOIE-NOS</h2>
            <h3 className="text-xl font-semibold mb-2">Como Você Pode Ajudar</h3>
            <p className="mb-4">
              Sua contribuição é essencial para continuarmos nosso trabalho. Apoie-nos com doações
              ou participando dos nossos eventos!
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Doações via PIX</h3>
            <div className="pix-info-placeholder mb-4 p-4 border rounded-lg">
              <div className="text-center">
                <img className="inline" src="./assets/images/PIX-Christianitatis.png" alt="pix" />
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
          isOpen={activeModal === 'contato-modal'}
          onClose={() => setActiveModal(null)}
          title="Contato"
        >
          <ContactForm onSuccess={handleFormSuccess} onError={handleFormError} />
        </Modal>
      </div>
    </ErrorBoundary>
  )
}

export default App
