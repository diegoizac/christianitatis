import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import ContactForm from "../ContactForm";

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

describe("ContactForm", () => {
  const user = userEvent.setup({ delay: null });

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

    await user.click(screen.getByRole("button", { name: /enviar/i }));
    vi.runAllTimers();

    await waitFor(
      () => {
        expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
        expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument();
        expect(screen.getByText(/mensagem é obrigatória/i)).toBeInTheDocument();
      },
      { timeout: 15000 }
    );
  });

  it("deve validar formato de email", async () => {
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/email/i), "email-invalido");
    vi.runAllTimers();

    await waitFor(
      () => {
        expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
      },
      { timeout: 15000 }
    );

    await user.clear(screen.getByLabelText(/email/i));
    await user.type(screen.getByLabelText(/email/i), "email@valido.com");
    vi.runAllTimers();

    await waitFor(
      () => {
        expect(screen.queryByText(/email inválido/i)).not.toBeInTheDocument();
      },
      { timeout: 15000 }
    );
  });

  it("deve validar formato de telefone", async () => {
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/telefone/i), "123");
    vi.runAllTimers();

    await waitFor(
      () => {
        expect(screen.getByText(/telefone inválido/i)).toBeInTheDocument();
      },
      { timeout: 15000 }
    );

    await user.clear(screen.getByLabelText(/telefone/i));
    await user.type(screen.getByLabelText(/telefone/i), "11999999999");
    vi.runAllTimers();

    await waitFor(
      () => {
        expect(
          screen.queryByText(/telefone inválido/i)
        ).not.toBeInTheDocument();
      },
      { timeout: 15000 }
    );
  });

  it("deve formatar telefone corretamente", async () => {
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/telefone/i), "11999999999");
    vi.runAllTimers();

    await waitFor(
      () => {
        expect(screen.getByLabelText(/telefone/i)).toHaveValue(
          "(11) 99999-9999"
        );
      },
      { timeout: 15000 }
    );
  });

  it("deve chamar onSubmit com dados válidos", async () => {
    const onSubmit = vi.fn();
    const onSuccess = vi.fn();
    render(<ContactForm onSubmit={onSubmit} onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText(/nome/i), "João Silva");
    await user.type(screen.getByLabelText(/email/i), "joao@exemplo.com");
    await user.type(screen.getByLabelText(/telefone/i), "11999999999");
    await user.selectOptions(screen.getByLabelText(/assunto/i), ["eventos"]);
    await user.type(
      screen.getByLabelText(/mensagem/i),
      "Esta é uma mensagem de teste."
    );

    vi.runAllTimers();

    await user.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(
      () => {
        expect(onSubmit).toHaveBeenCalledWith({
          name: "João Silva",
          email: "joao@exemplo.com",
          phone: "(11) 99999-9999",
          subject: "eventos",
          message: "Esta é uma mensagem de teste.",
        });
        expect(onSuccess).toHaveBeenCalled();
      },
      { timeout: 15000 }
    );
  });

  it("deve mostrar e esconder mensagem de sucesso", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ContactForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/nome/i), "João Silva");
    await user.type(screen.getByLabelText(/email/i), "joao@exemplo.com");
    await user.type(
      screen.getByLabelText(/mensagem/i),
      "Esta é uma mensagem de teste."
    );

    vi.runAllTimers();

    await user.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(
      () => {
        expect(
          screen.getByText(/mensagem enviada com sucesso/i)
        ).toBeInTheDocument();
      },
      { timeout: 15000 }
    );

    vi.advanceTimersByTime(3000);

    await waitFor(
      () => {
        expect(
          screen.queryByText(/mensagem enviada com sucesso/i)
        ).not.toBeInTheDocument();
      },
      { timeout: 15000 }
    );
  });

  it("deve tratar erro na submissão", async () => {
    const error = new Error("Erro ao enviar");
    const onSubmit = vi.fn().mockRejectedValue(error);
    const onError = vi.fn();
    render(<ContactForm onSubmit={onSubmit} onError={onError} />);

    await user.type(screen.getByLabelText(/nome/i), "João Silva");
    await user.type(screen.getByLabelText(/email/i), "joao@exemplo.com");
    await user.type(
      screen.getByLabelText(/mensagem/i),
      "Esta é uma mensagem de teste."
    );

    vi.runAllTimers();

    await user.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(
      () => {
        expect(onError).toHaveBeenCalledWith("Erro ao enviar mensagem");
      },
      { timeout: 15000 }
    );
  });
});
