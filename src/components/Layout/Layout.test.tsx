import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from '.'
import { AuthProvider } from '../../contexts/AuthContext'

vi.mock('../../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: () => ({
    user: null,
    loading: false,
    error: null,
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
  }),
}))

describe('Layout Component', () => {
  const renderWithProviders = (children: React.ReactNode) => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </BrowserRouter>
    )
  }

  it('should render header', () => {
    renderWithProviders(<div>Test Content</div>)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('should render navigation', () => {
    renderWithProviders(<div>Test Content</div>)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should render main content', () => {
    renderWithProviders(<div>Test Content</div>)
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should render footer', () => {
    renderWithProviders(<div>Test Content</div>)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('should render with authenticated user', () => {
    vi.mocked(useAuth).mockReturnValueOnce({
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
      loading: false,
      error: null,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    })

    renderWithProviders(<div>Test Content</div>)
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })
})
