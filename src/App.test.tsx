import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

// Mock dos componentes que usam recursos externos
vi.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@react-three/drei", () => ({
  OrbitControls: () => null,
  useGLTF: () => ({ scene: {} }),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  ToastContainer: () => null,
}));

describe("App", () => {
  beforeEach(() => {
    // Mock do IntersectionObserver
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it("renders without crashing", async () => {
    render(<App />);
    await waitFor(
      () => {
        expect(document.querySelector(".main-container")).toBeTruthy();
      },
      { timeout: 2000 }
    );
  });

  it("contains header component", async () => {
    render(<App />);
    await waitFor(
      () => {
        const header = document.querySelector("header");
        expect(header).toBeTruthy();
      },
      { timeout: 2000 }
    );
  });

  it("contains footer component", async () => {
    render(<App />);
    await waitFor(
      () => {
        const footer = document.querySelector("footer");
        expect(footer).toBeTruthy();
      },
      { timeout: 2000 }
    );
  });
});
