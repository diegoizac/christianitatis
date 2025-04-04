import { forwardRef, InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  helperText?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      error,
      size = 'md',
      variant = 'outline',
      leftIcon,
      rightIcon,
      helperText,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputSizes = {
      sm: 'h-8 text-sm px-3',
      md: 'h-10 text-base px-4',
      lg: 'h-12 text-lg px-4',
    }

    const inputVariants = {
      outline: 'border border-gray-300 dark:border-gray-600 rounded-lg',
      filled: 'bg-gray-100 dark:bg-gray-800 rounded-lg',
    }

    const inputClasses = clsx(
      'w-full bg-transparent',
      'text-gray-900 dark:text-white',
      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
      'focus:outline-none',
      inputSizes[size],
      inputVariants[variant],
      leftIcon && 'pl-10',
      rightIcon && 'pr-10',
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

            <input
              ref={ref}
              aria-invalid={!!error}
              disabled={disabled}
              className={inputClasses}
              {...props}
            />

            {rightIcon && (
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                {rightIcon}
              </span>
            )}
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

TextInput.displayName = 'TextInput'
