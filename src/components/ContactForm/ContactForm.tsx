import React, { useState, FormEvent, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useDebounce from '../../hooks/useDebounce'
import { useFormValidation } from '../../hooks/useFormValidation'
import { ContactFormProps, ContactFormData } from '../../types/forms'

export default function ContactForm({ onSubmit, onSuccess, onError }: ContactFormProps) {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { errors, validateContactForm, setErrors } = useFormValidation()
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    subject: '',
    phone: '',
  })

  // Debounce dos valores do formulário para validação
  const debouncedFormData = useDebounce(formData, 500)

  // Validação automática quando os valores mudam
  useEffect(() => {
    validateContactForm(debouncedFormData)
  }, [debouncedFormData, validateContactForm])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateContactForm(formData)) return

    setIsSubmitting(true)
    setShowSuccess(false)

    try {
      await onSubmit?.(formData)
      setFormData({ name: '', email: '', message: '', subject: '', phone: '' })
      setShowSuccess(true)
      onSuccess?.()

      // Esconde a mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      const errorMessage = error instanceof Error ? error.message : t('form.errors.submitError')
      setErrors(prev => ({
        ...prev,
        submit: errorMessage,
      }))
      onError?.(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      let formatted = numbers
      if (numbers.length > 2) formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
      if (numbers.length > 7)
        formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
      return formatted
    }
    return value
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {showSuccess && (
        <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
          {t('form.success')}
        </div>
      )}

      {errors.submit && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
          {errors.submit}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {t('form.name')} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } transition-colors duration-200`}
          aria-label={t('form.name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {t('form.email')} <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } transition-colors duration-200`}
          aria-label={t('form.email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          {t('form.phone')}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={e => {
            const formatted = formatPhone(e.target.value)
            handleChange({
              ...e,
              target: { ...e.target, value: formatted },
            })
          }}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          } transition-colors duration-200`}
          aria-label={t('form.phone')}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          {t('form.subject')}
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm transition-colors duration-200"
          aria-label={t('form.subject')}
        >
          <option value="">{t('form.subjectPlaceholder')}</option>
          <option value="eventos">{t('form.subjects.events')}</option>
          <option value="duvidas">{t('form.subjects.questions')}</option>
          <option value="sugestoes">{t('form.subjects.suggestions')}</option>
          <option value="outros">{t('form.subjects.others')}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          {t('form.message')} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          } transition-colors duration-200`}
          aria-label={t('form.message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || Object.keys(errors).length > 0}
        className={`w-full px-4 py-2 text-white rounded-md transition-colors duration-200 ${
          isSubmitting || Object.keys(errors).length > 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? t('form.sending') : t('form.send')}
      </button>
    </form>
  )
}
