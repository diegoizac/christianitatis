import React, { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { EventList } from '@/components/EventList'
import ContactForm from '@/components/ContactForm'
import { PrivateRoute } from '@/components/PrivateRoute'
import { Animation } from '@/components/Animation'
import { OptimizedImage } from '@/components/OptimizedImage'
import Footer from '@/components/Footer'
import Modal from '@/components/Modal'
import { AuthModal } from '@/components/Modals/AuthModal'
import LeftMenu from '@/components/LeftMenu'
import { AuthProvider } from '@/contexts/AuthContext'
import Header from '@/components/Header'

// Importando imagens
import todosEventosImg from '@/assets/images/todos-eventos.jpeg'
import pixImg from '@/assets/images/PIX-Christianitatis.png'
import logoImg from '@/assets/images/logo-main.png'

// Componente da página inicial
function AppContent() {
  return (
    <div className="relative min-h-screen bg-white">
      <div className="absolute inset-0">
        <Animation src="animations/logo-3d-christianitatisv002.glb" />
      </div>
    </div>
  )
}

// Layout compartilhado para o site principal
function MainLayout() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const handleOpenAuth = () => {
    setActiveModal('auth')
  }

  return (
    <div className="main-container bg-gray-100 relative min-h-screen">
      <Header isScrolled={false} setActiveModal={setActiveModal} onOpenAuth={handleOpenAuth} />
      <LeftMenu setActiveModal={setActiveModal} />
      <div className="content">
        <Routes>
          <Route index element={<AppContent />} />
          <Route path="eventos" element={<EventList />} />
          <Route path="contato" element={<ContactForm />} />
        </Routes>
      </div>
      <Footer setActiveModal={setActiveModal} />

      {/* Modals */}
      <AuthModal isOpen={activeModal === 'auth'} onClose={() => setActiveModal(null)} />

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
              src={todosEventosImg}
              alt="Todos os eventos"
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>

          {/* Grid de eventos */}
          <EventList title="Próximos Eventos" subtitle="Confira nossa agenda de eventos" />
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
            Sua contribuição é essencial para continuarmos nosso trabalho. Apoie-nos com doações ou
            participando dos nossos eventos!
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Doações via PIX</h3>
          <div className="pix-info-placeholder mb-4 p-4 border rounded-lg">
            <div className="text-center">
              <OptimizedImage
                src={pixImg}
                alt="QR Code PIX"
                width={200}
                height={200}
                className="inline-block"
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
        isOpen={activeModal === 'contato-modal'}
        onClose={() => setActiveModal(null)}
        title="Contato"
      >
        <ContactForm />
      </Modal>
    </div>
  )
}

// Layout compartilhado para o dashboard
function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <OptimizedImage
                  src={logoImg}
                  alt="Christianitatis"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route index element={<div>Dashboard</div>} />
            <Route path="events" element={<div>Eventos</div>} />
            <Route path="users" element={<div>Usuários</div>} />
            <Route path="settings" element={<div>Configurações</div>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<MainLayout />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
