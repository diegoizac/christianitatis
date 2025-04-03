import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from ".";

describe("Input Component", () => {
  it("should render correctly", () => {
    render(<Input placeholder="Digite algo" />);
    expect(screen.getByPlaceholderText("Digite algo")).toBeInTheDocument();
  });

  it("should render with label", () => {
    render(<Input label="Nome" placeholder="Digite seu nome" />);
    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite seu nome")).toBeInTheDocument();
  });

  it("should render error message", () => {
    render(
      <Input
        label="Email"
        type="email"
        error="Email inválido"
        placeholder="Digite seu email"
      />
    );
    expect(screen.getByText("Email inválido")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("should render help text", () => {
    render(
      <Input
        label="Senha"
        type="password"
        helpText="Mínimo de 8 caracteres"
        placeholder="Digite sua senha"
      />
    );
    expect(screen.getByText("Mínimo de 8 caracteres")).toBeInTheDocument();
  });

  it("should handle change events", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test" },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("textbox")).toHaveClass("opacity-50");
  });

  it("should render with different variants", () => {
    const { rerender } = render(<Input variant="outline" />);
    expect(screen.getByRole("textbox")).toHaveClass("border");

    rerender(<Input variant="filled" />);
    expect(screen.getByRole("textbox")).toHaveClass("bg-gray-100");
  });

  it("should render with different sizes", () => {
    const { rerender } = render(<Input size="sm" />);
    expect(screen.getByRole("textbox")).toHaveClass("px-3 py-1.5 text-sm");

    rerender(<Input size="md" />);
    expect(screen.getByRole("textbox")).toHaveClass("px-4 py-2 text-base");

    rerender(<Input size="lg" />);
    expect(screen.getByRole("textbox")).toHaveClass("px-6 py-3 text-lg");
  });

  it("should render with left icon", () => {
    render(
      <Input
        leftIcon={<span data-testid="left-icon">🔍</span>}
        placeholder="Pesquisar"
      />
    );
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("pl-10");
  });

  it("should render with right icon", () => {
    render(
      <Input
        rightIcon={<span data-testid="right-icon">✓</span>}
        placeholder="Validar"
      />
    );
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("pr-10");
  });
});
