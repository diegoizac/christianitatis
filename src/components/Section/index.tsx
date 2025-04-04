import { HTMLAttributes } from 'react'
import clsx from 'clsx'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /**
   * Título da seção
   */
  title?: string
  /**
   * Subtítulo da seção
   */
  subtitle?: string
  /**
   * Conteúdo da seção
   */
  children: React.ReactNode
  /**
   * Classes CSS adicionais
   */
  className?: string
  /**
   * ID da seção para navegação
   */
  id?: string
  /**
   * Variante da seção
   */
  variant?: 'default' | 'alternate'
}

export default function Section({
  title,
  subtitle,
  variant = 'default',
  className,
  children,
  id,
  ...props
}: SectionProps) {
  const titleId = id ? `${id}-title` : undefined

  return (
    <section
      role="region"
      aria-labelledby={titleId}
      className={clsx(
        'py-16',
        {
          'bg-white': variant === 'default',
          'bg-gray-50': variant === 'alternate',
        },
        className
      )}
      id={id}
      {...props}
    >
      <div className="container mx-auto px-4">
        {title && (
          <h2 id={titleId} className="text-3xl font-bold text-gray-900 text-center mb-4">
            {title}
          </h2>
        )}
        {subtitle && <p className="text-xl text-gray-600 text-center mb-8">{subtitle}</p>}
        {children}
      </div>
    </section>
  )
}
