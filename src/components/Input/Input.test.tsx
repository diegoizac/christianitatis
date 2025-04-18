import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '.'

describe('Input Component', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Type here" />)
    const input = screen.getByPlaceholderText('Type here')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('h-10') // medium size
  })

  it('renders with label', () => {
    render(<Input label="Username" id="username" />)
    const label = screen.getByText('Username')
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'username')
  })

  it('renders with error message', () => {
    render(<Input error="This field is required" />)
    const errorMessage = screen.getByText('This field is required')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass('text-red-500')
  })

  it('renders with help text', () => {
    render(<Input helpText="Enter your username" />)
    const helpText = screen.getByText('Enter your username')
    expect(helpText).toBeInTheDocument()
    expect(helpText).toHaveClass('text-gray-500')
  })

  it('renders with left icon', () => {
    render(<Input leftIcon={<span data-testid="left-icon">🔍</span>} />)
    const iconWrapper = screen.getByTestId('left-icon-wrapper')
    const icon = screen.getByTestId('left-icon')
    expect(iconWrapper).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })

  it('renders with right icon', () => {
    render(<Input rightIcon={<span data-testid="right-icon">✓</span>} />)
    const iconWrapper = screen.getByTestId('right-icon-wrapper')
    const icon = screen.getByTestId('right-icon')
    expect(iconWrapper).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })

  it('handles different sizes', () => {
    const { rerender } = render(<Input size="sm" />)
    expect(screen.getByRole('textbox')).toHaveClass('h-8')

    rerender(<Input size="lg" />)
    expect(screen.getByRole('textbox')).toHaveClass('h-12')
  })

  it('handles different variants', () => {
    const { rerender } = render(<Input variant="outline" />)
    expect(screen.getByRole('textbox').parentElement).toHaveClass('border-gray-300')

    rerender(<Input variant="filled" />)
    expect(screen.getByRole('textbox').parentElement).toHaveClass('bg-gray-100')
  })

  it('handles disabled state', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('opacity-50')
    expect(input).toHaveClass('cursor-not-allowed')
  })

  it('handles user input', async () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'test')

    expect(handleChange).toHaveBeenCalledTimes(4) // one call per character
    expect(input).toHaveValue('test')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('should render correctly', () => {
    render(<Input placeholder="Digite algo" />)
    expect(screen.getByPlaceholderText('Digite algo')).toBeInTheDocument()
  })

  it('should render with label', () => {
    render(<Input label="Nome" placeholder="Digite seu nome" />)
    expect(screen.getByText('Nome')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite seu nome')).toBeInTheDocument()
  })

  it('should render error message', () => {
    render(
      <Input label="Email" type="email" error="Email inválido" placeholder="Digite seu email" />
    )
    expect(screen.getByText('Email inválido')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('should render help text', () => {
    render(
      <Input
        label="Senha"
        type="password"
        helpText="Mínimo de 8 caracteres"
        placeholder="Digite sua senha"
      />
    )
    expect(screen.getByText('Mínimo de 8 caracteres')).toBeInTheDocument()
  })

  it('should handle change events', () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test' },
    })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('textbox').parentElement?.parentElement).toHaveClass('opacity-50')
  })

  it('should render with different variants', () => {
    const { rerender } = render(<Input variant="outline" />)
    expect(screen.getByRole('textbox').parentElement).toHaveClass('border-gray-300')

    rerender(<Input variant="filled" />)
    expect(screen.getByRole('textbox').parentElement).toHaveClass('bg-gray-100')
  })

  it('should render with different sizes', () => {
    const { rerender } = render(<Input size="sm" />)
    expect(screen.getByRole('textbox')).toHaveClass('h-8', 'text-sm')

    rerender(<Input size="md" />)
    expect(screen.getByRole('textbox')).toHaveClass('h-10', 'text-base')

    rerender(<Input size="lg" />)
    expect(screen.getByRole('textbox')).toHaveClass('h-12', 'text-lg')
  })

  it('should render with left icon', () => {
    render(<Input leftIcon={<span data-testid="left-icon">🔍</span>} placeholder="Pesquisar" />)
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('pl-10')
  })

  it('should render with right icon', () => {
    render(<Input rightIcon={<span data-testid="right-icon">✓</span>} placeholder="Validar" />)
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('pr-10')
  })

  it('should apply error styles when error prop is provided', () => {
    render(<Input error="Campo obrigatório" />)
    expect(screen.getByRole('textbox').parentElement).toHaveClass('border-red-500')
    expect(screen.getByText('Campo obrigatório')).toHaveClass('text-red-500')
  })

  it('should apply focus styles', () => {
    render(<Input variant="outline" />)
    expect(screen.getByRole('textbox').parentElement).toHaveClass('focus-within:ring-2')
  })

  it('should render input with label', () => {
    render(<Input label="Test Label" name="test" />)
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
  })

  it('should handle value changes', () => {
    const onChange = vi.fn()
    render(<Input name="test" onChange={onChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test value' } })
    expect(onChange).toHaveBeenCalled()
  })

  it('should display error message', () => {
    render(<Input name="test" error="Test error message" />)
    expect(screen.getByText('Test error message')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<Input name="test" className="custom-class" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-class')
  })

  it('should handle disabled state', () => {
    render(<Input name="test" disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('should handle readonly state', () => {
    render(<Input name="test" readOnly />)
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
  })

  it('should handle required state', () => {
    render(<Input name="test" required />)
    expect(screen.getByRole('textbox')).toBeRequired()
  })

  it('should handle placeholder', () => {
    render(<Input name="test" placeholder="Test placeholder" />)
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument()
  })

  it('should handle different types', () => {
    render(<Input name="test" type="password" />)
    expect(screen.getByLabelText('test')).toHaveAttribute('type', 'password')
  })

  it('should handle focus and blur events', () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    render(<Input name="test" onFocus={onFocus} onBlur={onBlur} />)

    const input = screen.getByRole('textbox')
    fireEvent.focus(input)
    expect(onFocus).toHaveBeenCalled()

    fireEvent.blur(input)
    expect(onBlur).toHaveBeenCalled()
  })
})
