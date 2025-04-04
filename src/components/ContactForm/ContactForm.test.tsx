import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ContactForm } from '.'
import type { ContactFormData } from '.'

describe('ContactForm', () => {
  it('deve renderizar todos os campos obrigatórios', () => {
    render(<ContactForm onSubmit={async () => {}} />)

    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar mensagem/i })).toBeInTheDocument()
  })

  it('deve mostrar erro quando campos obrigatórios estão vazios', async () => {
    render(<ContactForm onSubmit={async () => {}} />)

    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/mensagem é obrigatória/i)).toBeInTheDocument()
    })
  })

  it('deve mostrar erro quando email é inválido', async () => {
    render(<ContactForm onSubmit={async () => {}} />)

    const emailInput = screen.getByLabelText(/email/i)
    fireEvent.change(emailInput, { target: { value: 'email-invalido' } })

    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument()
    })
  })

  it('deve chamar onSubmit com dados válidos', async () => {
    const onSubmitMock = vi.fn<[ContactFormData], Promise<void>>(async () => {})
    render(<ContactForm onSubmit={onSubmitMock} />)

    fireEvent.change(screen.getByLabelText(/nome completo/i), {
      target: { value: 'João Silva' },
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'joao@exemplo.com' },
    })
    fireEvent.change(screen.getByLabelText(/mensagem/i), {
      target: { value: 'Olá mundo!' },
    })

    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        name: 'João Silva',
        email: 'joao@exemplo.com',
        phone: '',
        subject: '',
        message: 'Olá mundo!',
      })
    })
  })

  it('deve desabilitar o botão durante o envio', async () => {
    const onSubmitMock = vi.fn<[ContactFormData], Promise<void>>(
      () => new Promise(resolve => setTimeout(resolve, 1000))
    )
    render(<ContactForm onSubmit={onSubmitMock} />)

    fireEvent.change(screen.getByLabelText(/nome completo/i), {
      target: { value: 'João Silva' },
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'joao@exemplo.com' },
    })
    fireEvent.change(screen.getByLabelText(/mensagem/i), {
      target: { value: 'Olá mundo!' },
    })

    const submitButton = screen.getByRole('button', { name: /enviar mensagem/i })
    fireEvent.click(submitButton)

    expect(submitButton).toBeDisabled()

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
  })

  it('deve renderizar campos opcionais', () => {
    render(<ContactForm onSubmit={async () => {}} />)

    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/assunto/i)).toBeInTheDocument()
  })

  it('deve renderizar opções de contato alternativas', () => {
    render(<ContactForm onSubmit={async () => {}} />)

    expect(screen.getByText(/você também pode nos contatar através de:/i)).toBeInTheDocument()
    expect(screen.getByText(/contato@christianitatis.com/i)).toBeInTheDocument()
    expect(screen.getByText(/\(11\) 99999-9999/i)).toBeInTheDocument()
  })
})
