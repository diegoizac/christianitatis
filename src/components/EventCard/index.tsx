import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { CalendarIcon, ClockIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { Event } from '@/types/Event'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * Props para o componente EventCard
 */
interface EventCardProps {
  event: Event
  className?: string
  href?: string
  onClick?: () => void
  showStatus?: boolean
  compact?: boolean
}

/**
 * Componente para exibir um card de evento
 */
export default function EventCard({
  event,
  className,
  href,
  onClick,
  showStatus = true,
  compact = false,
}: EventCardProps) {
  // Extrair dados do evento
  const { title, description, date, location, media_urls, status, capacity } = event

  // Formatar data
  const formattedDate = (() => {
    try {
      return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    } catch (error) {
      return date
    }
  })()

  // Extrair hora do evento (se disponível)
  const time = date.includes('T') ? date.split('T')[1].substring(0, 5) : ''

  // Determinar imagem a ser exibida
  const imageUrl = media_urls && media_urls.length > 0 ? media_urls[0] : '/images/placeholder.svg'

  // Mapear status para cores e textos
  const statusConfig = {
    pendente: {
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      label: 'Pendente',
    },
    aprovado: {
      color: 'bg-green-500',
      textColor: 'text-green-600',
      label: 'Aprovado',
    },
    reprovado: {
      color: 'bg-red-500',
      textColor: 'text-red-600',
      label: 'Reprovado',
    },
  }

  // Usar configuração de status ou padrão
  const statusInfo = statusConfig[status] || {
    color: 'bg-gray-500',
    textColor: 'text-gray-600',
    label: 'Desconhecido',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={clsx(
        'flex flex-col md:flex-row',
        'group relative overflow-hidden rounded-3xl',
        'bg-white',
        'shadow-lg hover:shadow-2xl',
        'transition-all duration-500',
        'border border-gray-100',
        'transform hover:-translate-y-1',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Status indicator */}
      {showStatus && (
        <div
          className={clsx(
            'absolute top-6 right-6 z-10',
            'flex items-center gap-2 px-3 py-1',
            'rounded-full bg-white/95',
            'backdrop-blur-sm shadow-sm',
            'text-sm font-medium',
            statusInfo.textColor
          )}
        >
          <div className={clsx('w-2 h-2 rounded-full', statusInfo.color)} />
          {statusInfo.label}
        </div>
      )}

      {/* Image container */}
      <div
        className={clsx(
          'relative overflow-hidden',
          compact ? 'w-full h-48' : 'w-full md:w-2/5 h-72 md:h-auto'
        )}
      >
        <motion.img
          loading="lazy"
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 via-transparent to-transparent md:bg-gradient-to-r" />
        {!media_urls ||
          (media_urls.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-sm">Sem imagem disponível</span>
            </div>
          ))}
      </div>

      <div className={clsx('relative flex flex-col', compact ? 'p-4' : 'p-8 md:p-10 md:w-3/5')}>
        {/* Date overlay */}
        <div className="flex items-center gap-4 text-primary mb-4">
          <CalendarIcon className="w-5 h-5" />
          <span className="text-base font-medium tracking-wide">{formattedDate}</span>
        </div>

        <motion.h3
          className={clsx(
            'font-bold text-gray-900 mb-2',
            compact ? 'text-xl' : 'text-2xl md:text-3xl mb-4'
          )}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>

        {!compact && (
          <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed line-clamp-3">
            {description}
          </p>
        )}

        <div className={clsx('space-y-2', compact ? 'mb-4' : 'mb-6')}>
          {time && (
            <div className="flex items-center text-gray-500">
              <ClockIcon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="text-base">{time}</span>
            </div>
          )}

          <div className="flex items-center text-gray-500">
            <MapPinIcon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="text-base">{location}</span>
          </div>

          {capacity !== undefined && capacity > 0 && (
            <div className="flex items-center text-gray-500">
              <UserGroupIcon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="text-base">Capacidade: {capacity} pessoas</span>
            </div>
          )}
        </div>

        {href && (
          <motion.a
            href={href}
            className={clsx(
              'inline-flex items-center',
              'text-primary hover:text-primary-dark',
              'transition-colors duration-300',
              'text-base font-medium',
              'mt-auto'
            )}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={e => {
              if (onClick) {
                e.preventDefault()
                onClick()
              }
            }}
          >
            Saiba mais
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        )}
      </div>
    </motion.div>
  )
}
