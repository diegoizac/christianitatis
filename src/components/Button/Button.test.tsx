import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '.'

describe('Button Component', () => {
  it('should render with primary variant by default', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveClass('bg-primary')
    expect(button).toHaveClass('hover:bg-primary-600')
    expect(button).toHaveClass('focus:ring-primary-500')
  })

  it('should render with secondary variant', () => {
    render(<Button variant="secondary">Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveClass('bg-secondary')
    expect(button).toHaveClass('hover:bg-secondary-600')
    expect(button).toHaveClass('focus:ring-secondary-500')
  })

  it('should render with accent variant', () => {
    render(<Button variant="accent">Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveClass('bg-accent')
    expect(button).toHaveClass('hover:bg-accent-600')
    expect(button).toHaveClass('focus:ring-accent-500')
  })

  it('should render with different sizes', () => {
    const { rerender } = render(<Button size="sm">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5', 'text-sm')

    rerender(<Button size="md">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2', 'text-base')

    rerender(<Button size="lg">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3', 'text-lg')
  })

  it('should handle click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled and show loading spinner when isLoading is true', () => {
    render(<Button isLoading>Click me</Button>)
    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed')
    expect(button).toHaveClass('text-transparent', 'hover:text-transparent')

    const spinner = screen.getByRole('img', { hidden: true })
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('animate-spin')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed')
  })

  it('should render with base styles', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'rounded-lg',
      'transition-colors',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2'
    )
  })

  it('should merge custom className with default classes', () => {
    render(<Button className="custom-class">Click me</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('custom-class')
    expect(button).toHaveClass('bg-primary') // Mantém classes padrão
  })
})
