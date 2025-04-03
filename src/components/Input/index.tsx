import { InputHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label do input
   */
  label?: string;
  /**
   * Mensagem de erro
   */
  error?: string;
  /**
   * Texto de ajuda
   */
  helpText?: string;
  /**
   * Ícone à esquerda
   */
  leftIcon?: React.ReactNode;
  /**
   * Ícone à direita
   */
  rightIcon?: React.ReactNode;
  /**
   * Classes CSS adicionais para o container
   */
  containerClassName?: string;
  /**
   * Variante do input
   */
  variant?: "outline" | "filled";
  /**
   * Tamanho do input
   */
  size?: "sm" | "md" | "lg";
}

const inputSizes = {
  sm: {
    input: "h-8 text-sm",
    label: "text-xs",
    icon: "w-4 h-4",
    padding: {
      normal: "px-3",
      withIcon: {
        left: "pl-8 pr-3",
        right: "pl-3 pr-8",
        both: "px-8",
      },
    },
  },
  md: {
    input: "h-10 text-base",
    label: "text-sm",
    icon: "w-5 h-5",
    padding: {
      normal: "px-4",
      withIcon: {
        left: "pl-10 pr-4",
        right: "pl-4 pr-10",
        both: "px-10",
      },
    },
  },
  lg: {
    input: "h-12 text-lg",
    label: "text-base",
    icon: "w-6 h-6",
    padding: {
      normal: "px-5",
      withIcon: {
        left: "pl-12 pr-5",
        right: "pl-5 pr-12",
        both: "px-12",
      },
    },
  },
};

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
      containerClassName,
      variant = "outline",
      size = "md",
      className,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizes = inputSizes[size];

    // Determina o padding baseado nos ícones
    const getPadding = () => {
      if (leftIcon && rightIcon) return sizes.padding.withIcon.both;
      if (leftIcon) return sizes.padding.withIcon.left;
      if (rightIcon) return sizes.padding.withIcon.right;
      return sizes.padding.normal;
    };

    return (
      <div className={clsx("w-full", containerClassName)}>
        {label && (
          <motion.label
            htmlFor={props.id}
            className={clsx(
              "block font-medium mb-1.5",
              "text-gray-700 dark:text-gray-200",
              disabled && "opacity-60",
              sizes.label
            )}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {label}
            {required && (
              <span className="text-red-500 dark:text-red-400 ml-1">*</span>
            )}
          </motion.label>
        )}

        <div className="relative">
          <motion.div
            className={clsx(
              "relative rounded-lg overflow-hidden",
              "transition-all duration-200",
              variant === "outline" && [
                "border",
                error
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600",
              ],
              variant === "filled" && [
                "bg-gray-100 dark:bg-gray-700",
                "border border-transparent",
              ],
              disabled && "opacity-60",
              "focus-within:ring-2",
              error
                ? "focus-within:ring-red-500/20 dark:focus-within:ring-red-400/20"
                : "focus-within:ring-accent/20"
            )}
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
          >
            {leftIcon && (
              <div
                className={clsx(
                  "absolute left-3 top-1/2 -translate-y-1/2",
                  "text-gray-400 dark:text-gray-500",
                  sizes.icon
                )}
              >
                {leftIcon}
              </div>
            )}

            <input
              ref={ref}
              className={clsx(
                "w-full bg-transparent",
                "text-gray-900 dark:text-white",
                "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                "focus:outline-none",
                disabled && "cursor-not-allowed",
                sizes.input,
                getPadding(),
                className
              )}
              disabled={disabled}
              required={required}
              aria-invalid={!!error}
              {...props}
            />

            {rightIcon && (
              <div
                className={clsx(
                  "absolute right-3 top-1/2 -translate-y-1/2",
                  "text-gray-400 dark:text-gray-500",
                  sizes.icon
                )}
              >
                {rightIcon}
              </div>
            )}
          </motion.div>

          {(error || helpText) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5"
            >
              {error ? (
                <p className="text-red-500 dark:text-red-400 text-sm">
                  {error}
                </p>
              ) : (
                helpText && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {helpText}
                  </p>
                )
              )}
            </motion.div>
          )}
        </div>
      </div>
    );
  }
);
