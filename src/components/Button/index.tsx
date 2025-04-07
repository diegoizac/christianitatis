import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visual do botão
   * @default "primary"
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  /**
   * Tamanho do botão
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg'
  /**
   * Se o botão está em estado de loading
   * @default false
   */
  isLoading?: boolean
  /**
   * Conteúdo do botão
   */
  children: React.ReactNode
  /**
   * Componente alternativo para o botão
   */
  as?: typeof Link
  /**
   * URL para o componente Link
   */
  to?: string
}

/**
 * Componente de botão com variantes de estilo
 * @example
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      isLoading,
      variant = 'primary',
      size = 'default',
      as: Component = 'button',
      to,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background'

    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      danger: 'bg-red-600 text-white hover:bg-red-700',
      success: 'bg-green-600 text-white hover:bg-green-700',
    }

    const sizes = {
      default: 'h-10 py-2 px-4',
      sm: 'h-9 px-3',
      lg: 'h-11 px-8',
    }

    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      isLoading && 'opacity-50 cursor-not-allowed',
      className
    )

    if (Component === Link && to) {
      return (
        <Component to={to} className={classes}>
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current" />
          ) : (
            children
          )}
        </Component>
      )
    }

    return (
      <button className={classes} disabled={isLoading} ref={ref} {...props}>
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current" />
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
