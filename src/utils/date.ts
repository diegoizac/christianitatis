export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function isValidDate(date: string): boolean {
  const d = new Date(date)
  return d instanceof Date && !isNaN(d.getTime())
}

export function isValidTime(time: string): boolean {
  return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)
}

export function isFutureDate(date: string): boolean {
  const d = new Date(date)
  const now = new Date()
  return d > now
}

export function formatDateForInput(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function combineDateAndTime(date: string, time: string): Date {
  const [year, month, day] = date.split('-')
  const [hours, minutes] = time.split(':')
  return new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes))
}
