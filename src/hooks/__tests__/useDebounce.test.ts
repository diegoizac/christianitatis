import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounce } from "../useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("deve retornar o valor inicial imediatamente", () => {
    const { result } = renderHook(() => useDebounce("teste", 500));
    expect(result.current).toBe("teste");
  });

  it("deve atualizar o valor após o delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "teste", delay: 500 },
      }
    );

    // Atualiza o valor
    rerender({ value: "novo valor", delay: 500 });

    // Verifica que ainda mantém o valor antigo
    expect(result.current).toBe("teste");

    // Avança o timer
    vi.advanceTimersByTime(500);

    // Agora deve ter o novo valor
    expect(result.current).toBe("novo valor");
  });

  it("deve limpar o timeout ao desmontar", () => {
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
    const { unmount } = renderHook(() => useDebounce("teste", 500));

    // Força um update para garantir que o timeout foi criado
    vi.advanceTimersByTime(100);

    // Desmonta o componente
    unmount();

    // Verifica se clearTimeout foi chamado
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
