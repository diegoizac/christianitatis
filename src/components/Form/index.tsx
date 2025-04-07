import { FormHTMLAttributes, ReactNode, Children, isValidElement, cloneElement } from 'react'
import { useForm, FormConfig } from '../../hooks/useForm'

interface FormRenderProps<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  handleChange: (field: keyof T, value: T[keyof T]) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

interface FormProps<T> {
  children: ((props: FormRenderProps<T>) => ReactNode) | ReactNode
  config: FormConfig<T>
  onSubmit: (data: T) => void | Promise<void>
  className?: string
}

/**
 * Componente Form que integra com o hook useForm
 * Suporta tanto children diretos quanto render props pattern
 * @example
 * // Com children diretos
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
 *   <Input name="email" placeholder="Email" />
 * </Form>
 *
 * // Com render props
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

  const renderProps: FormRenderProps<T> = {
    values,
    errors,
    handleChange,
    handleSubmit: handleFormSubmit,
  }

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children(renderProps)
    }

    return Children.map(children, child => {
      if (!isValidElement(child)) return child

      if (child.type === 'input' || (child.props && 'name' in child.props)) {
        const name = child.props.name as keyof T
        return cloneElement(child, {
          value: values[name],
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(name, e.target.value),
          error: errors[name],
        })
      }

      if (child.props && child.props.children) {
        return cloneElement(child, {
          children: Children.map(child.props.children, nestedChild => {
            if (!isValidElement(nestedChild)) return nestedChild

            if (
              nestedChild.type === 'input' ||
              (nestedChild.props && 'name' in nestedChild.props)
            ) {
              const name = nestedChild.props.name as keyof T
              return cloneElement(nestedChild, {
                value: values[name],
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(name, e.target.value),
                error: errors[name],
              })
            }

            return nestedChild
          }),
        })
      }

      return child
    })
  }

  return (
    <form noValidate onSubmit={handleFormSubmit} className={className} role="form" {...props}>
      {renderChildren()}
    </form>
  )
}
