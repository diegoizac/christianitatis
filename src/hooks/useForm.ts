import { useState, useCallback } from 'react'

export type ValidationRule<T> = {
  validate: (value: T) => boolean
  message: string
}

export type FieldConfig<T> = {
  initialValue: T
  validate?: ValidationRule<T>[]
}

export type FormConfig<T> = {
  [K in keyof T]: FieldConfig<T[K]>
}

export type FormErrors<T> = {
  [K in keyof T]?: string
}

export type FormValues<T> = {
  [K in keyof T]: T[K]
}

export type UseFormReturn<T> = {
  values: FormValues<T>
  errors: FormErrors<T>
  isDirty: Record<keyof T, boolean>
  handleChange: (name: keyof T, value: T[keyof T]) => void
  handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => (e?: React.FormEvent) => void
  resetForm: () => void
  validateForm: () => boolean
}

/**
 * Hook para gerenciar estados e validações de formulário
 * @param config Configuração dos campos do formulário
 * @returns Objeto com valores, erros e funções de manipulação
 * @example
 * const { values, errors, handleChange, handleSubmit } = useForm({
 *   email: {
 *     initialValue: '',
 *     validate: [
 *       {
 *         validate: (value) => value.includes('@'),
 *         message: 'Email inválido'
 *       }
 *     ]
 *   }
 * })
 */
export function useForm<T extends Record<string, unknown>>(
  config: FormConfig<T>
): UseFormReturn<T> {
  const initialValues = Object.entries(config).reduce((acc, [key, field]) => {
    acc[key as keyof T] = field.initialValue
    return acc
  }, {} as T)

  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors<T>>({})
  const [isDirty, setIsDirty] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>)

  const validateField = useCallback(
    (name: keyof T, value: T[keyof T]): string | undefined => {
      const fieldConfig = config[name]
      if (!fieldConfig?.validate) return undefined

      for (const rule of fieldConfig.validate) {
        if (!rule.validate(value)) {
          return rule.message
        }
      }

      return undefined
    },
    [config]
  )

  const handleChange = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      setValues(prev => ({ ...prev, [name]: value }))
      setIsDirty(prev => ({ ...prev, [name]: true }))

      const error = validateField(name, value)
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }))
    },
    [validateField]
  )

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors<T> = {}
    let isValid = true

    Object.keys(values).forEach(key => {
      const error = validateField(key as keyof T, values[key as keyof T])
      if (error) {
        newErrors[key as keyof T] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [values, validateField])

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void | Promise<void>) => {
      return async (e?: React.FormEvent) => {
        if (e) {
          e.preventDefault()
        }

        const isValid = validateForm()
        if (isValid) {
          await onSubmit(values)
        }
      }
    },
    [values, validateForm]
  )

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setIsDirty({} as Record<keyof T, boolean>)
  }, [initialValues])

  return {
    values,
    errors,
    isDirty,
    handleChange,
    handleSubmit,
    resetForm,
    validateForm,
  }
}
