import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useDebounce } from '../useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('deve retornar o valor inicial imediatamente', () => {
    const { result } = renderHook(() => useDebounce('teste', 500))
    expect(result.current).toBe('teste')
  })

  it('deve atualizar o valor após o delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'teste', delay: 500 }
      }
    )

    rerender({ value: 'novo valor', delay: 500 })
    expect(result.current).toBe('teste')

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current).toBe('novo valor')
  })

  it('deve limpar o timeout ao desmontar', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
    const { unmount } = renderHook(() => useDebounce('teste', 500))

    unmount()
    expect(clearTimeoutSpy).toHaveBeenCalled()
  })
})