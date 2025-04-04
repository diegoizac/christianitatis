import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Header } from '.'

describe('Header Component', () => {
  it('should render logo and navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

    expect(screen.getByText('Christianitatis')).toBeInTheDocument()
    expect(screen.getByText('Início')).toBeInTheDocument()
    expect(screen.getByText('Sobre')).toBeInTheDocument()
    expect(screen.getByText('Contato')).toBeInTheDocument()
  })

  it('should render authentication buttons', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

    expect(screen.getByText('Entrar')).toBeInTheDocument()
    expect(screen.getByText('Cadastrar')).toBeInTheDocument()
  })

  it('should render mobile menu button', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

    expect(screen.getByLabelText('Menu')).toBeInTheDocument()
  })
})
