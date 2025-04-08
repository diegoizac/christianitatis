import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../contexts/AuthContext'
import AuthModal, { AuthModalProps } from '../../components/AuthModal'
import { toast } from 'react-toastify'

// Mock do react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}))

// Mock do AuthContext
vi.mock('../../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth: () => ({
    signIn: vi.fn().mockImplementation((email, password) => {
      if (email === 'test@example.com' && password === 'password123') {
        return Promise.reject(new Error('Credenciais inválidas'))
      }
      return Promise.resolve()
    }),
    signUp: vi.fn().mockImplementation(() => Promise.resolve()),
    resetPassword: vi.fn().mockImplementation(() => Promise.resolve()),
    loading: false,
    error: null,
    user: null,
    session: null,
    signOut: vi.fn(),
    updateProfile: vi.fn(),
  }),
}))

const renderAuthModal = (props: Partial<AuthModalProps>) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <AuthModal isOpen={true} onClose={() => {}} initialView="login" {...props} />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('AuthModal', () => {
  const defaultProps: Partial<AuthModalProps> = {
    isOpen: true,
    onClose: vi.fn(),
    initialView: 'login',
  }

  it('não deve renderizar quando isOpen é false', () => {
    renderAuthModal({ ...defaultProps, isOpen: false })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('deve mostrar o formulário de login por padrão', () => {
    renderAuthModal()
    expect(screen.getByRole('heading', { name: 'Entrar' })).toBeInTheDocument()
    expect(screen.getByTestId('email-input')).toBeInTheDocument()
    expect(screen.getByTestId('password-input')).toBeInTheDocument()
  })

  it('deve mostrar o formulário de registro quando initialView é register', () => {
    renderAuthModal({ ...defaultProps, initialView: 'register' })
    expect(screen.getByRole('heading', { name: 'Criar Conta' })).toBeInTheDocument()
    expect(screen.getByTestId('name-input')).toBeInTheDocument()
    expect(screen.getByTestId('email-input')).toBeInTheDocument()
  })

  it('deve alternar entre login e registro quando o link é clicado', () => {
    renderAuthModal(defaultProps)
    fireEvent.click(screen.getByRole('button', { name: 'Não tem uma conta? Cadastre-se' }))
    expect(screen.getByRole('heading', { name: 'Criar Conta' })).toBeInTheDocument()
  })

  it('deve desabilitar os campos durante o loading', async () => {
    renderAuthModal(defaultProps)
    const submitButton = screen.getByRole('button', { name: 'Entrar' })
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')

    expect(submitButton).not.toBeDisabled()
    expect(emailInput).not.toBeDisabled()
    expect(passwordInput).not.toBeDisabled()
  })

  it('deve mostrar mensagem de erro quando o login falha', async () => {
    renderAuthModal(defaultProps)
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const submitButton = screen.getByRole('button', { name: 'Entrar' })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Credenciais inválidas')
    })
  })

  it('deve mostrar mensagem de sucesso após registro bem-sucedido', async () => {
    renderAuthModal({ ...defaultProps, initialView: 'register' })
    const nameInput = screen.getByTestId('name-input')
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const confirmPasswordInput = screen.getByTestId('confirm-password-input')
    const submitButton = screen.getByRole('button', { name: 'Criar Conta' })

    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Conta criada com sucesso! Por favor, verifique seu email.'
      )
    })
  })
})
