import { FormHTMLAttributes, ReactNode } from 'react'
import { useForm, FormConfig } from '../../hooks/useForm'

interface FormProps<T> {
  children: (props: {
    values: T
    errors: Partial<Record<keyof T, string>>
    handleChange: (field: keyof T, value: T[keyof T]) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  }) => ReactNode
  config: FormConfig<T>
  onSubmit: (data: T) => void | Promise<void>
  className?: string
}

/**
 * Componente Form que integra com o hook useForm
 * @example
 * <Form
 *   config={{
 *     email: {
 *       initialValue: '',
 *       validate: [
 *         {
 *           validate: (value) => value.includes('@'),
 *           message: 'Email inválido'
 *         }
 *       ]
 *     }
 *   }}
 *   onSubmit={(values) => console.log(values)}
 * >
 *   {({ values, errors, handleChange }) => (
 *     <Input
 *       name="email"
 *       value={values.email}
 *       onChange={(e) => handleChange('email', e.target.value)}
 *       error={errors.email}
 *     />
 *   )}
 * </Form>
 */
export function Form<T>({ children, config, onSubmit, className, ...props }: FormProps<T>) {
  const { values, errors, handleChange, handleSubmit } = useForm<T>(config)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(onSubmit)(e)
  }

  return (
    <form noValidate onSubmit={handleFormSubmit} className={className} {...props}>
      {children({
        values,
        errors,
        handleChange,
        handleSubmit: handleFormSubmit,
      })}
    </form>
  )
}
