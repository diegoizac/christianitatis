import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { AuthProvider, useAuth } from '../AuthContext'
import { createClient } from '@supabase/supabase-js'
import { MemoryRouter } from 'react-router-dom'

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({
        data: { user: { id: '123', email: 'test@example.com' } },
        error: null,
      }),
      signUp: vi.fn().mockResolvedValue({
        data: { user: { id: '123', email: 'test@example.com' } },
        error: null,
      }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
      getSession: vi.fn().mockResolvedValue({
        data: { session: null },
        error: null,
      }),
    },
  })),
}))

const TestComponent = () => {
  const { signIn, signUp, signOut, user, loading, error } = useAuth()
  return (
    <div>
      <button onClick={() => signIn('test@example.com', 'password123')}>Sign In</button>
      <button onClick={() => signUp('test@example.com', 'password123', 'Test User')}>
        Sign Up
      </button>
      <button onClick={() => signOut()}>Sign Out</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {user && <p>User: {user.email}</p>}
    </div>
  )
}

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{component}</AuthProvider>
    </MemoryRouter>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should handle successful login', async () => {
    renderWithRouter(<TestComponent />)

    fireEvent.click(screen.getByText('Sign In'))

    await waitFor(() => {
      expect(screen.getByText('User: test@example.com')).toBeInTheDocument()
    })
  })

  it('should handle login error', async () => {
    const mockClient = createClient('', '')
    vi.mocked(mockClient.auth.signInWithPassword).mockRejectedValueOnce(
      new Error('Invalid credentials')
    )

    renderWithRouter(<TestComponent />)

    fireEvent.click(screen.getByText('Sign In'))

    await waitFor(() => {
      expect(screen.getByText('Error: Invalid credentials')).toBeInTheDocument()
    })
  })

  it('should handle successful registration', async () => {
    renderWithRouter(<TestComponent />)

    fireEvent.click(screen.getByText('Sign Up'))

    await waitFor(() => {
      expect(screen.getByText('User: test@example.com')).toBeInTheDocument()
    })
  })

  it('should handle registration error with existing email', async () => {
    const mockClient = createClient('', '')
    vi.mocked(mockClient.auth.signUp).mockRejectedValueOnce(new Error('Email already exists'))

    renderWithRouter(<TestComponent />)

    fireEvent.click(screen.getByText('Sign Up'))

    await waitFor(() => {
      expect(screen.getByText('Error: Email already exists')).toBeInTheDocument()
    })
  })

  it('should handle sign out', async () => {
    renderWithRouter(<TestComponent />)

    fireEvent.click(screen.getByText('Sign Out'))

    await waitFor(() => {
      expect(screen.queryByText(/User:/)).not.toBeInTheDocument()
    })
  })
})
