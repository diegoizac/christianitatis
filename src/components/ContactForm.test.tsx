import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { toast } from 'react-toastify'
import { supabase } from '@/lib/supabase'
import ContactForm from './ContactForm'
import { PostgrestFilterBuilder } from '@supabase/postgrest-js'

// Mock das dependências
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ error: null })),
        })),
      })),
    })),
    functions: {
      invoke: vi.fn(() => Promise.resolve({ data: null, error: null })),
    },
  },
}))

describe('ContactForm Component', () => {
  const mockOnClose = vi.fn()
  const mockOnSuccess = vi.fn()
  const mockOnError = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all form fields', () => {
    render(<ContactForm />)

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/assunto/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar mensagem/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
  })

  it('handles form input changes', async () => {
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/nome/i)
    const emailInput = screen.getByLabelText(/email/i)
    const subjectInput = screen.getByLabelText(/assunto/i)
    const messageInput = screen.getByLabelText(/mensagem/i)

    await userEvent.type(nameInput, 'John Doe')
    await userEvent.type(emailInput, 'john@example.com')
    await userEvent.type(subjectInput, 'Test Subject')
    await userEvent.type(messageInput, 'Test Message')

    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(subjectInput).toHaveValue('Test Subject')
    expect(messageInput).toHaveValue('Test Message')
  })

  it('handles successful form submission', async () => {
    render(<ContactForm onClose={mockOnClose} onSuccess={mockOnSuccess} onError={mockOnError} />)

    await userEvent.type(screen.getByLabelText(/nome/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com')
    await userEvent.type(screen.getByLabelText(/assunto/i), 'Test Subject')
    await userEvent.type(screen.getByLabelText(/mensagem/i), 'Test Message')

    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i })
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('contact_messages')
      expect(supabase.functions.invoke).toHaveBeenCalledWith('send-contact-email', {
        body: expect.any(String),
      })
      expect(toast.success).toHaveBeenCalledWith('Mensagem enviada com sucesso!')
      expect(mockOnSuccess).toHaveBeenCalled()
      expect(mockOnClose).toHaveBeenCalled()
      expect(mockOnError).not.toHaveBeenCalled()
    })
  })

  it('handles form submission error from database', async () => {
    const dbError = { message: 'Database error' }
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ error: dbError })),
        })),
      })),
    }))

    render(<ContactForm onClose={mockOnClose} onSuccess={mockOnSuccess} onError={mockOnError} />)

    await userEvent.type(screen.getByLabelText(/nome/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com')
    await userEvent.type(screen.getByLabelText(/assunto/i), 'Test Subject')
    await userEvent.type(screen.getByLabelText(/mensagem/i), 'Test Message')

    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i })
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Erro ao enviar mensagem. Por favor, tente novamente.'
      )
      expect(mockOnError).toHaveBeenCalledWith(
        'Erro ao enviar mensagem. Por favor, tente novamente.'
      )
      expect(mockOnSuccess).not.toHaveBeenCalled()
      expect(mockOnClose).not.toHaveBeenCalled()
    })
  })

  it('handles form submission error from email service', async () => {
    const emailError = { message: 'Email service error' }
    vi.mocked(supabase.functions.invoke).mockImplementationOnce(() =>
      Promise.resolve({ data: null, error: emailError })
    )

    render(<ContactForm onClose={mockOnClose} onSuccess={mockOnSuccess} onError={mockOnError} />)

    await userEvent.type(screen.getByLabelText(/nome/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com')
    await userEvent.type(screen.getByLabelText(/assunto/i), 'Test Subject')
    await userEvent.type(screen.getByLabelText(/mensagem/i), 'Test Message')

    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i })
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Erro ao enviar mensagem. Por favor, tente novamente.'
      )
      expect(mockOnError).toHaveBeenCalledWith(
        'Erro ao enviar mensagem. Por favor, tente novamente.'
      )
      expect(mockOnSuccess).not.toHaveBeenCalled()
      expect(mockOnClose).not.toHaveBeenCalled()
    })
  })

  it('handles close button click', async () => {
    render(<ContactForm onClose={mockOnClose} />)

    const closeButton = screen.getByRole('button', { name: /cancelar/i })
    await userEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalled()
  })

  it('disables submit button while submitting', async () => {
    // Mock a slow response from the database
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(
            () => new Promise(resolve => setTimeout(() => resolve({ error: null }), 100))
          ),
        })),
      })),
    }))

    render(<ContactForm />)

    await userEvent.type(screen.getByLabelText(/nome/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com')
    await userEvent.type(screen.getByLabelText(/assunto/i), 'Test Subject')
    await userEvent.type(screen.getByLabelText(/mensagem/i), 'Test Message')

    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i })
    await userEvent.click(submitButton)

    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent('Enviando...')

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
      expect(submitButton).toHaveTextContent('Enviar Mensagem')
    })
  })

  it('validates required fields', async () => {
    render(<ContactForm />)

    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i })
    await userEvent.click(submitButton)

    expect(screen.getByLabelText(/nome/i)).toBeInvalid()
    expect(screen.getByLabelText(/email/i)).toBeInvalid()
    expect(screen.getByLabelText(/assunto/i)).toBeInvalid()
    expect(screen.getByLabelText(/mensagem/i)).toBeInvalid()
  })
})
