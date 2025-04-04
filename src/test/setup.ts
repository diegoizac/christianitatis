import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Mock do IntersectionObserver
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})

window.IntersectionObserver = mockIntersectionObserver

// Estende o expect do Vitest com os matchers do jest-dom
expect.extend(matchers)

// Limpa o DOM após cada teste
afterEach(() => {
  cleanup()
})
