import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Button from './Button'

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-blue-600') // primary variant
    expect(button).toHaveClass('px-4 py-2') // medium size
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-gray-200')

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-2 border-blue-600')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="small">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-3 py-1.5')

    rerender(<Button size="large">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-6 py-3')
  })

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('opacity-50')
    expect(button).toHaveClass('cursor-not-allowed')
  })

  it('shows loading state', () => {
    render(<Button isLoading>Submit</Button>)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.queryByText('Submit')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('handles click events when not disabled or loading', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not handle click events when disabled', async () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    )

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('does not handle click events when loading', async () => {
    const handleClick = vi.fn()
    render(
      <Button isLoading onClick={handleClick}>
        Click me
      </Button>
    )

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

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
