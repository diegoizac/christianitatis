import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ContactForm from '../ContactForm'
import { contactService } from '../../services/api'

vi.mock('../../services/api', () => ({
  contactService: {
    submitForm: vi.fn()
  }
}))

describe('ContactForm', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  it('deve mostrar mensagens de erro após o debounce', async () => {
    render(<ContactForm />)
    
    const emailInput = screen.getByPlaceholderText('seu@email.com')
    fireEvent.change(emailInput, { target: { value: 'email-invalido' } })
    
    // Não deve mostrar erro imediatamente
    expect(screen.queryByText('Digite um email válido')).toBeNull()
    
    // Avança o timer para simular o debounce
    vi.advanceTimersByTime(500)
    
    // Agora deve mostrar o erro
    await waitFor(() => {
      expect(screen.getByText('Digite um email válido')).toBeInTheDocument()
    })
  })

  it('deve validar o formulário completo após o debounce', async () => {
    render(<ContactForm />)
    
    const nameInput = screen.getByPlaceholderText('Seu nome completo')
    const emailInput = screen.getByPlaceholderText('seu@email.com')
    const messageInput = screen.getByPlaceholderText('Digite sua mensagem aqui...')
    
    // Preenche os campos com valores válidos
    fireEvent.change(nameInput, { target: { value: 'João Silva' } })
    fireEvent.change(emailInput, { target: { value: 'joao@email.com' } })
    fireEvent.change(messageInput, { target: { value: 'Esta é uma mensagem de teste com mais de 10 caracteres.' } })
    
    // Avança o timer para simular o debounce
    vi.advanceTimersByTime(500)
    
    // Não deve mostrar erros
    await waitFor(() => {
      expect(screen.queryByText('O nome é obrigatório')).toBeNull()
      expect(screen.queryByText('O email é obrigatório')).toBeNull()
      expect(screen.queryByText('A mensagem é obrigatória')).toBeNull()
    })
  })

  it('deve limpar os erros após corrigir os campos', async () => {
    render(<ContactForm />)
    
    const emailInput = screen.getByPlaceholderText('seu@email.com')
    
    // Insere email inválido
    fireEvent.change(emailInput, { target: { value: 'email-invalido' } })
    
    // Avança o timer para simular o debounce
    vi.advanceTimersByTime(500)
    
    // Verifica se o erro aparece
    await waitFor(() => {
      expect(screen.getByText('Digite um email válido')).toBeInTheDocument()
    })
    
    // Corrige o email
    fireEvent.change(emailInput, { target: { value: 'email@valido.com' } })
    
    // Avança o timer novamente
    vi.advanceTimersByTime(500)
    
    // Verifica se o erro foi removido
    await waitFor(() => {
      expect(screen.queryByText('Digite um email válido')).toBeNull()
    })
  })

  it('deve enviar o formulário apenas com dados válidos', async () => {
    const onSuccess = vi.fn()
    render(<ContactForm onSuccess={onSuccess} />)
    
    const nameInput = screen.getByPlaceholderText('Seu nome completo')
    const emailInput = screen.getByPlaceholderText('seu@email.com')
    const messageInput = screen.getByPlaceholderText('Digite sua mensagem aqui...')
    const submitButton = screen.getByText('Enviar Mensagem')
    
    // Tenta enviar com campos vazios
    fireEvent.click(submitButton)
    expect(contactService.submitForm).not.toHaveBeenCalled()
    
    // Preenche os campos corretamente
    fireEvent.change(nameInput, { target: { value: 'João Silva' } })
    fireEvent.change(emailInput, { target: { value: 'joao@email.com' } })
    fireEvent.change(messageInput, { target: { value: 'Esta é uma mensagem de teste.' } })
    
    // Avança o timer para o debounce
    vi.advanceTimersByTime(500)
    
    // Envia o formulário
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(contactService.submitForm).toHaveBeenCalledWith({
        name: 'João Silva',
        email: 'joao@email.com',
        message: 'Esta é uma mensagem de teste.',
        subject: '',
        phone: ''
      })
      expect(onSuccess).toHaveBeenCalled()
    })
  })
})