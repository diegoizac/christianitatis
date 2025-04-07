import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import ContactForm from "../ContactForm";

// Mock do React
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useEffect: vi.fn((fn) => fn()),
  };
});

// Mock do i18n
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "form.name": "Nome",
        "form.email": "Email",
        "form.phone": "Telefone",
        "form.subject": "Assunto",
        "form.message": "Mensagem",
        "form.send": "Enviar",
        "form.sending": "Enviando...",
        "form.success": "Mensagem enviada com sucesso!",
        "form.errors.nameRequired": "Nome é obrigatório",
        "form.errors.nameMinLength": "Nome deve ter pelo menos 3 caracteres",
        "form.errors.emailRequired": "Email é obrigatório",
        "form.errors.emailInvalid": "Email inválido",
        "form.errors.phoneInvalid": "Telefone inválido",
        "form.errors.messageRequired": "Mensagem é obrigatória",
        "form.errors.messageMinLength":
          "Mensagem deve ter pelo menos 10 caracteres",
        "form.errors.submitError": "Erro ao enviar mensagem",
        "form.subjectPlaceholder": "Selecione um assunto",
        "form.subjects.events": "Eventos",
        "form.subjects.questions": "Dúvidas",
        "form.subjects.suggestions": "Sugestões",
        "form.subjects.others": "Outros",
      };
      return translations[key] || key;
    },
  }),
}));

// Mock do useDebounce
vi.mock("../../hooks/useDebounce", () => ({
  useDebounce: (value: any) => value,
}));

describe("ContactForm", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("deve renderizar todos os campos do formulário", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/assunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  it("deve mostrar erro quando campos obrigatórios estão vazios", async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole("button", { name: /enviar/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/mensagem é obrigatória/i)).toBeInTheDocument();
    });
  });

  it("deve validar formato de email", async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, "email-invalido");

    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    });

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "email@valido.com");

    await waitFor(() => {
      expect(screen.queryByText(/email inválido/i)).not.toBeInTheDocument();
    });
  });

  it("deve validar formato de telefone", async () => {
    render(<ContactForm />);

    const phoneInput = screen.getByLabelText(/telefone/i);
    await userEvent.type(phoneInput, "123");

    await waitFor(() => {
      expect(screen.getByText(/telefone inválido/i)).toBeInTheDocument();
    });

    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, "11999999999");

    await waitFor(() => {
      expect(screen.queryByText(/telefone inválido/i)).not.toBeInTheDocument();
    });
  });

  it("deve formatar telefone corretamente", async () => {
    render(<ContactForm />);

    const phoneInput = screen.getByLabelText(/telefone/i);
    await userEvent.type(phoneInput, "11999999999");

    expect(phoneInput).toHaveValue("(11) 99999-9999");
  });

  it("deve chamar onSubmit com dados válidos", async () => {
    const onSubmit = vi.fn();
    const onSuccess = vi.fn();
    render(<ContactForm onSubmit={onSubmit} onSuccess={onSuccess} />);

    await userEvent.type(screen.getByLabelText(/nome/i), "João Silva");
    await userEvent.type(screen.getByLabelText(/email/i), "joao@exemplo.com");
    await userEvent.type(screen.getByLabelText(/telefone/i), "11999999999");
    await userEvent.selectOptions(screen.getByLabelText(/assunto/i), [
      "eventos",
    ]);
    await userEvent.type(
      screen.getByLabelText(/mensagem/i),
      "Esta é uma mensagem de teste."
    );

    await userEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: "João Silva",
        email: "joao@exemplo.com",
        phone: "(11) 99999-9999",
        subject: "eventos",
        message: "Esta é uma mensagem de teste.",
      });
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("deve mostrar e esconder mensagem de sucesso", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ContactForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText(/nome/i), "João Silva");
    await userEvent.type(screen.getByLabelText(/email/i), "joao@exemplo.com");
    await userEvent.type(
      screen.getByLabelText(/mensagem/i),
      "Esta é uma mensagem de teste."
    );

    await userEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/mensagem enviada com sucesso/i)
      ).toBeInTheDocument();
    });

    vi.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(
        screen.queryByText(/mensagem enviada com sucesso/i)
      ).not.toBeInTheDocument();
    });
  });

  it("deve tratar erro na submissão", async () => {
    const errorMessage = "Erro de conexão";
    const onSubmit = vi.fn().mockRejectedValue(new Error(errorMessage));
    const onError = vi.fn();
    render(<ContactForm onSubmit={onSubmit} onError={onError} />);

    await userEvent.type(screen.getByLabelText(/nome/i), "João Silva");
    await userEvent.type(screen.getByLabelText(/email/i), "joao@exemplo.com");
    await userEvent.type(
      screen.getByLabelText(/mensagem/i),
      "Esta é uma mensagem de teste."
    );

    await userEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(errorMessage);
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
