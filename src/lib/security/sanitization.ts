import DOMPurify from 'dompurify'

/**
 * Sanitiza HTML removendo tags e atributos maliciosos
 * @param dirty HTML sujo que precisa ser sanitizado
 * @returns HTML limpo e seguro
 */
export function sanitizeHTML(dirty: string): string {
  const config = {
    ALLOWED_TAGS: [
      'p',
      'strong',
      'em',
      'u',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'a',
      'br',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    KEEP_CONTENT: true,
  }

  return DOMPurify.sanitize(dirty, config)
}

/**
 * Remove caracteres especiais e potencialmente perigosos de uma string
 * @param input String que precisa ser sanitizada
 * @returns String limpa e segura
 */
export function sanitizeInput(input: string): string {
  return input.replace(/[<>'"]/g, '')
}

/**
 * Escapa caracteres especiais do SQL para prevenir injeção SQL
 * @param input Valor que precisa ser escapado
 * @returns Valor escapado seguro para SQL
 */
export function escapeSQL(
  input: string | number | boolean | null | undefined
): string | number | boolean | null | undefined {
  if (typeof input !== 'string') return input
  return input.replace(/[\\']/g, '\\$&')
}
