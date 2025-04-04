import { forwardRef, InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label do input
   */
  label?: string
  /**
   * Mensagem de erro
   */
  error?: string
  /**
   * Texto de ajuda
   */
  helpText?: string
  /**
   * Ícone à esquerda
   */
  leftIcon?: React.ReactNode
  /**
   * Ícone à direita
   */
  rightIcon?: React.ReactNode
  /**
   * Variante do input
   */
  variant?: 'outline' | 'filled'
  /**
   * Tamanho do input
   */
  size?: 'sm' | 'md' | 'lg'
}

const inputSizes = {
  sm: {
    input: 'h-8 text-sm',
    label: 'text-xs',
    icon: 'w-4 h-4',
    padding: {
      normal: 'px-3',
      withIcon: {
        left: 'pl-8 pr-3',
        right: 'pl-3 pr-8',
        both: 'px-8',
      },
    },
  },
  md: {
    input: 'h-10 text-base',
    label: 'text-sm',
    icon: 'w-5 h-5',
    padding: {
      normal: 'px-4',
      withIcon: {
        left: 'pl-10 pr-4',
        right: 'pl-4 pr-10',
        both: 'px-10',
      },
    },
  },
  lg: {
    input: 'h-12 text-lg',
    label: 'text-base',
    icon: 'w-6 h-6',
    padding: {
      normal: 'px-5',
      withIcon: {
        left: 'pl-12 pr-5',
        right: 'pl-5 pr-12',
        both: 'px-12',
      },
    },
  },
}

/**
 * Componente de input com suporte a ícones e estados
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="seu@email.com"
 *   error="Email inválido"
 * />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helpText,
      leftIcon,
      rightIcon,
      variant = 'outline',
      size = 'md',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputClasses = clsx(
      'w-full bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none',
      {
        // Size variants
        'h-8 text-sm px-3': size === 'sm',
        'h-10 text-base px-4': size === 'md',
        'h-12 text-lg px-4': size === 'lg',

        // Variant styles
        'border border-gray-300 dark:border-gray-600 rounded-lg': variant === 'outline',
        'bg-gray-100 dark:bg-gray-800 rounded-lg': variant === 'filled',

        // Icon padding
        'pl-10': leftIcon,
        'pr-10': rightIcon,

        // Error state
        'border-red-500 dark:border-red-500': error,

        // Disabled state
        'opacity-50 cursor-not-allowed': disabled,
      },
      className
    )

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <div
            className={clsx('relative rounded-lg overflow-hidden transition-all duration-200', {
              'border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-accent/20':
                variant === 'outline',
              'bg-gray-100 dark:bg-gray-800': variant === 'filled',
              'opacity-50': disabled,
            })}
            tabIndex={0}
          >
            {leftIcon && (
              <span
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500"
                data-testid="left-icon-wrapper"
              >
                {leftIcon}
              </span>
            )}

            <input
              ref={ref}
              className={inputClasses}
              disabled={disabled}
              aria-invalid={!!error}
              {...props}
            />

            {rightIcon && (
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500"
                data-testid="right-icon-wrapper"
              >
                {rightIcon}
              </span>
            )}
          </div>
        </div>
        {helpText && !error && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

export { TextInput } from './TextInput'
export type { TextInputProps } from './TextInput'

export { Select } from './Select'
export type { SelectProps } from './Select'

export { Textarea } from './Textarea'
export type { TextareaProps } from './Textarea'
