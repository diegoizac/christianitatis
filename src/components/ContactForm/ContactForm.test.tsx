import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from "./ContactForm";

describe("ContactForm", () => {
  it("deve renderizar todos os campos obrigatórios", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  it("deve mostrar erro quando campos obrigatórios estão vazios", async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/mensagem é obrigatória/i)).toBeInTheDocument();
    });
  });

  it("deve mostrar erro quando email é inválido", async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "email-invalido" } });

    const submitButton = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    });
  });

  it("deve chamar onSubmit com dados válidos", async () => {
    const onSubmitMock = vi.fn();
    render(<ContactForm onSubmit={onSubmitMock} />);

    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: "João Silva" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "joao@exemplo.com" },
    });
    fireEvent.change(screen.getByLabelText(/mensagem/i), {
      target: { value: "Olá mundo!" },
    });

    const submitButton = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        name: "João Silva",
        email: "joao@exemplo.com",
        message: "Olá mundo!",
      });
    });
  });

  it("deve desabilitar o botão durante o envio", async () => {
    const onSubmitMock = vi.fn(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );
    render(<ContactForm onSubmit={onSubmitMock} />);

    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: "João Silva" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "joao@exemplo.com" },
    });
    fireEvent.change(screen.getByLabelText(/mensagem/i), {
      target: { value: "Olá mundo!" },
    });

    const submitButton = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});
