import { forwardRef, TextareaHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled'
  leftIcon?: React.ReactNode
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      ...props
    },
    ref
  ) => {
    const textareaSizes = {
      sm: 'text-sm px-3 py-2',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-4 py-3',
    }

    const textareaVariants = {
      outline: 'border border-gray-300 dark:border-gray-600 rounded-lg',
      filled: 'bg-gray-100 dark:bg-gray-800 rounded-lg',
    }

    const textareaClasses = clsx(
      'w-full bg-transparent',
      'text-gray-900 dark:text-white',
      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
      'focus:outline-none',
      textareaSizes[size],
      textareaVariants[variant],
      leftIcon && 'pl-10',
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
              <span className="absolute top-3 left-3 flex items-start pointer-events-none text-gray-400 dark:text-gray-500">
                {leftIcon}
              </span>
            )}

            <textarea
              ref={ref}
              aria-invalid={!!error}
              disabled={disabled}
              className={textareaClasses}
              {...props}
            />
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

Textarea.displayName = 'Textarea'
