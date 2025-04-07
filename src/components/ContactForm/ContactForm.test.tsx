import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { toast } from 'react-toastify'
import ContactForm from '.'

jest.mock('react-toastify')

describe('ContactForm Component', () => {
  const defaultProps = {
    onSuccess: vi.fn(),
    onError: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render form fields', () => {
    render(<ContactForm {...defaultProps} />)

    expect(screen.getByTestId('name-input')).toBeInTheDocument()
    expect(screen.getByTestId('email-input')).toBeInTheDocument()
    expect(screen.getByTestId('phone-input')).toBeInTheDocument()
    expect(screen.getByTestId('subject-input')).toBeInTheDocument()
    expect(screen.getByTestId('message-input')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
  })

  it('should handle form submission with valid data', async () => {
    render(<ContactForm {...defaultProps} />)

    const nameInput = screen.getByTestId('name-input')
    const emailInput = screen.getByTestId('email-input')
    const phoneInput = screen.getByTestId('phone-input')
    const messageInput = screen.getByTestId('message-input')

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '1234567890' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })

    fireEvent.click(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Mensagem enviada com sucesso!')
      expect(defaultProps.onSuccess).toHaveBeenCalled()
    })
  })

  it('should handle submission error', async () => {
    const error = 'Erro ao enviar mensagem. Tente novamente.'

    // Mock the Promise.resolve to reject
    vi.spyOn(Promise, 'resolve').mockImplementationOnce(() => Promise.reject())

    render(<ContactForm {...defaultProps} />)

    const nameInput = screen.getByTestId('name-input')
    const emailInput = screen.getByTestId('email-input')
    const messageInput = screen.getByTestId('message-input')

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })

    fireEvent.click(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(error)
    })
  })

  it('should validate required fields', () => {
    render(<ContactForm {...defaultProps} />)

    fireEvent.click(screen.getByTestId('submit-button'))

    expect(screen.getByTestId('name-input')).toBeInvalid()
    expect(screen.getByTestId('email-input')).toBeInvalid()
    expect(screen.getByTestId('subject-input')).toBeInvalid()
    expect(screen.getByTestId('message-input')).toBeInvalid()
  })

  it('should validate email format', () => {
    render(<ContactForm {...defaultProps} />)

    const emailInput = screen.getByTestId('email-input')
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })

    expect(emailInput).toBeInvalid()
  })

  it('should show validation errors for empty fields', async () => {
    render(<ContactForm {...defaultProps} />)

    fireEvent.click(screen.getByTestId('submit-button'))

    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
    expect(screen.getByText('Mensagem é obrigatória')).toBeInTheDocument()
  })

  it('should show error for invalid email', async () => {
    render(<ContactForm {...defaultProps} />)

    const emailInput = screen.getByTestId('email-input')
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })

    fireEvent.click(screen.getByTestId('submit-button'))

    expect(screen.getByText('Email inválido')).toBeInTheDocument()
  })

  it('should clear form after successful submission', async () => {
    render(<ContactForm {...defaultProps} />)

    const nameInput = screen.getByTestId('name-input')
    const emailInput = screen.getByTestId('email-input')
    const messageInput = screen.getByTestId('message-input')

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })

    fireEvent.click(screen.getByTestId('submit-button'))

    expect(nameInput).toHaveValue('')
    expect(emailInput).toHaveValue('')
    expect(messageInput).toHaveValue('')
  })

  it('deve renderizar campos opcionais', () => {
    render(<ContactForm {...defaultProps} />)

    expect(screen.getByTestId('phone-input')).toBeInTheDocument()
    expect(screen.getByTestId('subject-input')).toBeInTheDocument()
  })

  it('deve renderizar opções de contato alternativas', () => {
    render(<ContactForm {...defaultProps} />)

    expect(screen.getByText(/você também pode nos contatar através de:/i)).toBeInTheDocument()
    expect(screen.getByText(/contato@christianitatis.com/i)).toBeInTheDocument()
    expect(screen.getByText(/\(11\) 99999-9999/i)).toBeInTheDocument()
  })

  it('disables submit button while submitting', async () => {
    render(<ContactForm {...defaultProps} />)

    const nameInput = screen.getByTestId('name-input')
    const emailInput = screen.getByTestId('email-input')
    const phoneInput = screen.getByTestId('phone-input')
    const messageInput = screen.getByTestId('message-input')

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '1234567890' } })
    fireEvent.change(messageInput, { target: { value: 'Test Message' } })

    fireEvent.click(screen.getByTestId('submit-button'))

    expect(screen.getByTestId('submit-button')).toBeDisabled()
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Enviando...')

    await waitFor(() => {
      expect(screen.getByTestId('submit-button')).not.toBeDisabled()
      expect(screen.getByTestId('submit-button')).toHaveTextContent('Enviar Mensagem')
    })
  })
})
