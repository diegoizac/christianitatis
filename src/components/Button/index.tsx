import { FC, ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visual do botão
   * @default "primary"
   */
  variant?: 'primary' | 'secondary' | 'accent'
  /**
   * Tamanho do botão
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Se o botão está em estado de loading
   * @default false
   */
  isLoading?: boolean
  /**
   * Conteúdo do botão
   */
  children: React.ReactNode
}

/**
 * Componente de botão com variantes de estilo
 * @example
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 */
export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variantStyles = {
    primary: 'bg-primary hover:bg-primary-600 text-white focus:ring-primary-500',
    secondary: 'bg-secondary hover:bg-secondary-600 text-white focus:ring-secondary-500',
    accent: 'bg-accent hover:bg-accent-600 text-white focus:ring-accent-500',
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const disabledStyles = 'opacity-50 cursor-not-allowed'
  const loadingStyles = 'relative text-transparent hover:text-transparent transition-none'

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        (disabled || isLoading) && disabledStyles,
        isLoading && loadingStyles,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </button>
  )
}
