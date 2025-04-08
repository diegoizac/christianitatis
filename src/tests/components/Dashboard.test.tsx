import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Dashboard from '../../components/Dashboard'

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      id: '123',
      email: 'test@example.com',
      user_metadata: {
        name: 'Test User',
      },
    },
    loading: false,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  )
}

describe('Dashboard', () => {
  it('deve renderizar o nome do usuário no título', () => {
    renderDashboard()
    expect(screen.getByText(/Test User/i)).toBeInTheDocument()
  })

  it('deve mostrar o email do usuário no card de perfil', () => {
    renderDashboard()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })

  it('deve mostrar os três cards principais', () => {
    renderDashboard()
    expect(screen.getByTestId('profile-card')).toBeInTheDocument()
    expect(screen.getByTestId('events-card')).toBeInTheDocument()
    expect(screen.getByTestId('support-card')).toBeInTheDocument()
  })

  it('deve mostrar os botões de ação em cada card', () => {
    renderDashboard()
    expect(screen.getByRole('button', { name: /editar perfil/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ver eventos/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /contato/i })).toBeInTheDocument()
  })

  it('deve mostrar a mensagem de eventos vazios', () => {
    renderDashboard()
    expect(screen.getByText(/nenhum evento encontrado/i)).toBeInTheDocument()
  })

  it('deve mostrar a mensagem de suporte', () => {
    renderDashboard()
    expect(screen.getByText(/precisa de ajuda/i)).toBeInTheDocument()
  })
})
