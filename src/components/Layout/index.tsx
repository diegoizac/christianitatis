import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import LeftMenu from '../LeftMenu'
import Modal from '../Modal'
import PaymentMethods from '../PaymentMethods'
import ContactForm from '../ContactForm'
import AuthForm from '../AuthForm'

interface LayoutProps {
  children?: ReactNode
  setActiveModal: (modal: string | null) => void
}

export function Layout({ children, setActiveModal }: LayoutProps): JSX.Element {
  const [activeModal, setActiveModalState] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      setIsScrolled(scrollTop > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCloseModal = () => {
    setActiveModalState(null)
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header isScrolled={isScrolled} />
      {/* Espaço para o header fixo */}
      <div className="h-20"></div>
      <div className="flex flex-1 relative">
        <LeftMenu setActiveModal={setActiveModal} />
        <div className="flex-1 relative">
          {/* Conteúdo principal */}
          <div className="relative z-10">{children || <Outlet />}</div>
        </div>
      </div>
      <Footer />

      {/* Modal de Autenticação */}
      <Modal
        id="auth-modal"
        isOpen={activeModal === 'auth-modal'}
        onClose={handleCloseModal}
        title="Entrar"
      >
        <div className="p-4">
          <AuthForm onSuccess={handleCloseModal} />
        </div>
      </Modal>

      {/* Modal de Eventos */}
      <Modal
        id="eventos-modal"
        isOpen={activeModal === 'eventos-modal'}
        onClose={handleCloseModal}
        title="Eventos"
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Próximos Eventos</h2>
          {/* Conteúdo do modal de eventos */}
        </div>
      </Modal>

      {/* Modal de Apoio */}
      <Modal
        id="apoie-modal"
        isOpen={activeModal === 'apoie-modal'}
        onClose={handleCloseModal}
        title="Apoie o Movimento"
      >
        <div className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Como Apoiar o Movimento</h2>
            <p className="text-gray-600">
              Sua contribuição é fundamental para mantermos nossa missão viva e alcançarmos mais
              pessoas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Dados para Contribuição</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">CNPJ (PIX):</p>
                    <p className="text-gray-600">18.900.689/0001-76</p>
                  </div>
                  <div>
                    <p className="font-medium">Banco:</p>
                    <p className="text-gray-600">033 - Santander</p>
                  </div>
                  <div>
                    <p className="font-medium">Agência:</p>
                    <p className="text-gray-600">3477</p>
                  </div>
                  <div>
                    <p className="font-medium">Conta:</p>
                    <p className="text-gray-600">13011157-8</p>
                  </div>
                  <div>
                    <p className="font-medium">Titular:</p>
                    <p className="text-gray-600">ASSOCIAÇÃO CHRISTIANITATIS</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Benefícios do Apoiador</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Acesso antecipado aos eventos</li>
                  <li>Descontos especiais em produtos</li>
                  <li>Newsletter exclusiva</li>
                  <li>Participação em encontros especiais</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src="/logo-main.png"
                    alt="Logo Christianitatis"
                    className="w-48 h-auto mb-4"
                  />
                  <img
                    src="/src/assets/images/PIX-Christianitatis.png"
                    alt="QR Code PIX"
                    className="w-48 h-48 object-contain"
                  />
                  <p className="text-sm text-gray-500 text-center">
                    Escaneie o QR Code acima com seu aplicativo bancário
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Formas de Pagamento</h3>
                <PaymentMethods />
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Em caso de dúvidas, entre em contato através do e-mail:{' '}
              <a
                href="mailto:contato@christianitatis.com"
                className="text-blue-600 hover:underline"
              >
                contato@christianitatis.com
              </a>
            </p>
          </div>
        </div>
      </Modal>

      {/* Modal de Contato */}
      <Modal
        id="contato-modal"
        isOpen={activeModal === 'contato-modal'}
        onClose={handleCloseModal}
        title="Entre em Contato"
      >
        <div className="p-6">
          <ContactForm onSuccess={handleCloseModal} />
        </div>
      </Modal>
    </div>
  )
}
