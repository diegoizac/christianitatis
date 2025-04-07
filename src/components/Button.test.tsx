import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from './Button'

expect.extend(toHaveNoViolations)

describe('Button', () => {
  it('não deve ter violações de acessibilidade', async () => {
    const { container } = render(<Button>Teste</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('deve ser focável e acionável por teclado', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Teste</Button>)

    const button = screen.getByRole('button', { name: 'Teste' })

    // Verifica se é focável
    button.focus()
    expect(button).toHaveFocus()

    // Verifica acionamento por teclado
    await userEvent.type(button, '{enter}')
    expect(handleClick).toHaveBeenCalled()

    await userEvent.type(button, '{space}')
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  it('deve ter contraste adequado em todas as variações', () => {
    const { rerender } = render(<Button variant="primary">Teste</Button>)
    let button = screen.getByRole('button')
    expect(button).toHaveClass('bg-blue-600') // Cor de fundo escura para texto claro

    rerender(<Button variant="secondary">Teste</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('text-gray-900') // Texto escuro para fundo claro

    rerender(<Button variant="outline">Teste</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('text-blue-600') // Texto colorido com borda
  })

  it('deve indicar estado desabilitado corretamente', () => {
    render(<Button disabled>Teste</Button>)
    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed')
  })

  it('deve aplicar classes de tamanho corretamente', () => {
    const { rerender } = render(<Button size="small">Teste</Button>)
    let button = screen.getByRole('button')
    expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm')

    rerender(<Button size="medium">Teste</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('px-4', 'py-2', 'text-base')

    rerender(<Button size="large">Teste</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('px-6', 'py-3', 'text-lg')
  })
})
