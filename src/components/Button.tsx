import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variação visual do botão
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline'

  /**
   * Tamanho do botão
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Conteúdo do botão
   */
  children: React.ReactNode

  /**
   * Classe CSS adicional
   */
  className?: string

  isLoading?: boolean
}

/**
 * Componente de botão com diferentes variações e tamanhos
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  className,
  disabled,
  isLoading,
  ...props
}) => {
  const baseStyles =
    'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  }

  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  }

  const disabledStyles = disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  return (
    <button
      className={twMerge(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabledStyles,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
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
          Carregando...
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
