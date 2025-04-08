import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { Form } from './index'
import { Input } from '../Input'

interface TestFormData {
  email: string
  password: string
}

describe('Form Component', () => {
  const defaultConfig = {
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
  }

  it('renders with children components', () => {
    render(
      <Form config={defaultConfig} onSubmit={() => {}}>
        <Input name="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Senha" />
      </Form>
    )

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument()
  })

  it('renders with render props pattern', () => {
    render(
      <Form<TestFormData> config={defaultConfig} onSubmit={() => {}}>
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

  it('handles form submission with valid data', async () => {
    const handleSubmit = vi.fn()
    render(
      <Form config={defaultConfig} onSubmit={handleSubmit}>
        <Input name="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Senha" />
      </Form>
    )

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Senha')
    const form = screen.getByRole('form')

    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password123')

    fireEvent.submit(form)

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('shows validation errors', async () => {
    render(
      <Form config={defaultConfig} onSubmit={() => {}}>
        <Input name="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Senha" />
      </Form>
    )

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Senha')
    const form = screen.getByRole('form')

    await userEvent.type(emailInput, 'invalid-email')
    await userEvent.type(passwordInput, '123')

    fireEvent.submit(form)

    expect(screen.getByText('Email inválido')).toBeInTheDocument()
    expect(screen.getByText('Senha deve ter no mínimo 6 caracteres')).toBeInTheDocument()
  })

  it('updates form values on input change', async () => {
    render(
      <Form<TestFormData> config={defaultConfig} onSubmit={() => {}}>
        {({ values }) => (
          <>
            <Input name="email" placeholder="Email" />
            <div data-testid="email-value">{values.email}</div>
          </>
        )}
      </Form>
    )

    const emailInput = screen.getByPlaceholderText('Email')
    await userEvent.type(emailInput, 'test@example.com')

    expect(screen.getByTestId('email-value')).toHaveTextContent('test@example.com')
  })

  it('prevents default form submission', () => {
    const handleSubmit = vi.fn()
    render(
      <Form config={defaultConfig} onSubmit={handleSubmit}>
        <Input name="email" placeholder="Email" />
      </Form>
    )

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('applies custom className to form element', () => {
    render(
      <Form config={defaultConfig} onSubmit={() => {}} className="custom-class">
        <Input name="email" placeholder="Email" />
      </Form>
    )

    expect(screen.getByRole('form')).toHaveClass('custom-class')
  })
})
