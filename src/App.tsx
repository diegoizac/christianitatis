import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import 'react-toastify/dist/ReactToastify.css'

import { Layout } from './components/Layout'
import Home from './pages/Home'
import Events from './pages/Events'
import Admin from './pages/Admin'
import ContactModal from './components/Modals/ContactModal'
import SupportModal from './components/Modals/SupportModal'

import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import { Unauthorized } from './pages/Auth/Unauthorized'
import { NewEvent } from './pages/Events/NewEvent'
import { EventDetails } from './pages/Events/EventDetails'
import { EventApproval } from './pages/Admin/EventApproval'
import { UserManagement } from './pages/Admin/UserManagement'

// Configuração das flags de futuro do React Router
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
}

export function App(): JSX.Element {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const handleCloseModal = () => setActiveModal(null)

  return (
    <HelmetProvider>
      <Router {...router}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Helmet>
              <title>Christianitatis</title>
            </Helmet>
            <Layout setActiveModal={setActiveModal}>
              <Routes>
                <Route
                  path="/"
                  element={<Home activeModal={activeModal} setActiveModal={setActiveModal} />}
                />
                <Route path="/events" element={<Events />} />
                <Route path="/admin/*" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/events/new" element={<NewEvent />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/admin/events/approval" element={<EventApproval />} />
                <Route path="/admin/users" element={<UserManagement />} />
              </Routes>
            </Layout>

            {/* Modais */}
            <ContactModal isOpen={activeModal === 'contact'} onClose={handleCloseModal} />
            <SupportModal isOpen={activeModal === 'support'} onClose={handleCloseModal} />
          </div>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  )
}

export default App
