import { forwardRef, SelectHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled'
  leftIcon?: React.ReactNode
  helperText?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      size = 'md',
      variant = 'outline',
      leftIcon,
      helperText,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const selectSizes = {
      sm: 'h-8 text-sm px-3',
      md: 'h-10 text-base px-4',
      lg: 'h-12 text-lg px-4',
    }

    const selectVariants = {
      outline: 'border border-gray-300 dark:border-gray-600 rounded-lg',
      filled: 'bg-gray-100 dark:bg-gray-800 rounded-lg',
    }

    const selectClasses = clsx(
      'w-full bg-transparent appearance-none',
      'text-gray-900 dark:text-white',
      'focus:outline-none',
      selectSizes[size],
      selectVariants[variant],
      leftIcon && 'pl-10',
      'pr-10', // Espaço para o ícone de seta
      error && 'border-red-500 focus:ring-red-500/20',
      disabled && 'opacity-50 cursor-not-allowed',
      className
    )

    const wrapperClasses = clsx(
      'relative rounded-lg overflow-hidden transition-all duration-200',
      variant === 'outline' && 'border border-gray-300 dark:border-gray-600',
      variant === 'outline' && !disabled && 'focus-within:ring-2 focus-within:ring-accent/20'
    )

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <div className={wrapperClasses} tabIndex={0}>
            {leftIcon && (
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                {leftIcon}
              </span>
            )}

            <select
              ref={ref}
              aria-invalid={!!error}
              disabled={disabled}
              className={selectClasses}
              {...props}
            >
              {children}
            </select>

            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        {(error || helperText) && (
          <p
            className={clsx(
              'mt-1 text-sm',
              error ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
