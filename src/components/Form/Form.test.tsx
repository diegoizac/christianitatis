import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Form } from '.'
import { Input } from '../Input'

describe('Form Component', () => {
  const formConfig = {
    email: {
      initialValue: '',
      validate: [
        {
          validate: (value: string) => value.includes('@'),
          message: 'Email inválido',
        },
      ],
    },
    password: {
      initialValue: '',
      validate: [
        {
          validate: (value: string) => value.length >= 6,
          message: 'Senha deve ter no mínimo 6 caracteres',
        },
      ],
    },
    testField: {
      initialValue: '',
    },
  }

  it('should render children correctly', () => {
    render(
      <Form config={formConfig} onSubmit={() => {}}>
        <Input name="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Senha" />
      </Form>
    )

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument()
  })

  it('should render with render props pattern', () => {
    render(
      <Form config={formConfig} onSubmit={() => {}}>
        {({ values, errors, handleChange }) => (
          <>
            <Input
              name="email"
              value={values.email}
              onChange={e => handleChange('email', e.target.value)}
              error={errors.email}
              placeholder="Email"
            />
            <Input
              name="password"
              type="password"
              value={values.password}
              onChange={e => handleChange('password', e.target.value)}
              error={errors.password}
              placeholder="Senha"
            />
          </>
        )}
      </Form>
    )

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument()
  })

  it('should handle form submission with validation', async () => {
    const handleSubmit = vi.fn()

    render(
      <Form config={formConfig} onSubmit={handleSubmit}>
        <Input name="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Senha" />
        <Input name="testField" placeholder="Test Field" />
        <button type="submit">Enviar</button>
      </Form>
    )

    fireEvent.click(screen.getByText('Enviar'))
    expect(handleSubmit).not.toHaveBeenCalled()

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Senha')
    const testFieldInput = screen.getByPlaceholderText('Test Field')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })
    fireEvent.change(testFieldInput, { target: { value: 'test value' } })
    fireEvent.click(screen.getByText('Enviar'))

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '123456',
      testField: 'test value',
    })
  })

  it('should automatically bind input values and errors', () => {
    render(
      <Form config={formConfig} onSubmit={() => {}}>
        <Input name="email" placeholder="Email" />
      </Form>
    )

    const input = screen.getByPlaceholderText('Email')
    fireEvent.change(input, { target: { value: 'invalid-email' } })

    expect(input).toHaveValue('invalid-email')
    expect(screen.getByText('Email inválido')).toBeInTheDocument()
  })

  it('should handle nested inputs', () => {
    render(
      <Form config={formConfig} onSubmit={() => {}}>
        <div>
          <Input name="email" placeholder="Email" />
          <div>
            <Input name="password" type="password" placeholder="Senha" />
          </div>
        </div>
      </Form>
    )

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Senha')

    fireEvent.change(emailInput, { target: { value: 'test' } })
    fireEvent.change(passwordInput, { target: { value: '12345' } })

    expect(screen.getByText('Email inválido')).toBeInTheDocument()
    expect(screen.getByText('Senha deve ter no mínimo 6 caracteres')).toBeInTheDocument()
  })

  it('should render form with children', () => {
    render(
      <Form config={formConfig} onSubmit={() => {}}>
        <input name="testField" type="text" placeholder="Test Input" />
      </Form>
    )
    expect(screen.getByPlaceholderText('Test Input')).toBeInTheDocument()
  })

  it('should handle form submission', () => {
    const onSubmit = vi.fn()
    render(
      <Form config={formConfig} onSubmit={onSubmit}>
        <input name="testField" type="text" placeholder="Test Input" />
        <button type="submit">Submit</button>
      </Form>
    )

    fireEvent.click(screen.getByText('Submit'))
    expect(onSubmit).toHaveBeenCalledWith({ email: '', password: '', testField: '' })
  })

  it('should prevent default form submission', () => {
    const onSubmit = vi.fn()
    const preventDefault = vi.fn()
    render(
      <Form config={formConfig} onSubmit={onSubmit}>
        <input name="testField" type="text" placeholder="Test Input" />
        <button type="submit">Submit</button>
      </Form>
    )

    fireEvent.submit(screen.getByRole('form'), { preventDefault })
    expect(preventDefault).toHaveBeenCalled()
  })

  it('should apply custom className', () => {
    render(
      <Form config={formConfig} onSubmit={() => {}} className="custom-class">
        <input name="testField" type="text" placeholder="Test Input" />
      </Form>
    )
    expect(screen.getByRole('form')).toHaveClass('custom-class')
  })

  it('should handle field changes', () => {
    const { getByPlaceholderText } = render(
      <Form config={formConfig} onSubmit={() => {}}>
        <input name="testField" type="text" placeholder="Test Input" />
      </Form>
    )

    const input = getByPlaceholderText('Test Input')
    fireEvent.change(input, { target: { value: 'test value' } })
    expect(input).toHaveValue('test value')
  })

  it('should handle validation errors', () => {
    const configWithValidation = {
      testField: {
        initialValue: '',
        validate: [
          {
            validate: (value: string) => value.length > 0,
            message: 'Field is required',
          },
        ],
      },
      email: {
        initialValue: '',
      },
      password: {
        initialValue: '',
      },
    }

    const onSubmit = vi.fn()
    render(
      <Form config={configWithValidation} onSubmit={onSubmit}>
        <input name="testField" type="text" placeholder="Test Input" />
        <button type="submit">Submit</button>
      </Form>
    )

    fireEvent.click(screen.getByText('Submit'))
    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('Field is required')).toBeInTheDocument()
  })
})
