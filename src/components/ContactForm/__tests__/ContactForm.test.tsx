import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

// Mock do i18n
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'form.name': 'Nome',
        'form.email': 'Email',
        'form.phone': 'Telefone',
        'form.subject': 'Assunto',
        'form.message': 'Mensagem',
        'form.send': 'Enviar',
        'form.sending': 'Enviando...',
        'form.success': 'Mensagem enviada com sucesso!',
        'form.errors.nameRequired': 'Nome é obrigatório',
        'form.errors.nameMinLength': 'Nome deve ter pelo menos 3 caracteres',
        'form.errors.emailRequired': 'Email é obrigatório',
        'form.errors.emailInvalid': 'Email inválido',
        'form.errors.phoneInvalid': 'Telefone inválido',
        'form.errors.messageRequired': 'Mensagem é obrigatória',
        'form.errors.messageMinLength': 'Mensagem deve ter pelo menos 10 caracteres',
        'form.errors.submitError': 'Erro ao enviar mensagem',
        'form.subjectPlaceholder': 'Selecione um assunto',
        'form.subjects.events': 'Eventos',
        'form.subjects.questions': 'Dúvidas',
        'form.subjects.suggestions': 'Sugestões',
        'form.subjects.others': 'Outros',
      };
      return translations[key] || key;
    },
  }),
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('deve renderizar todos os campos do formulário', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/assunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('deve mostrar erro quando campos obrigatórios estão vazios', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /enviar/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/email é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/mensagem é obrigatória/i)).toBeInTheDocument();
  });

  it('deve validar formato de email', async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'email-invalido');

    // Aguarda o debounce
    vi.advanceTimersByTime(500);

    expect(await screen.findByText(/email inválido/i)).toBeInTheDocument();

    // Corrige o email
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'email@valido.com');

    // Aguarda o debounce
    vi.advanceTimersByTime(500);

    expect(screen.queryByText(/email inválido/i)).not.toBeInTheDocument();
  });

  it('deve validar formato de telefone', async () => {
    render(<ContactForm />);

    const phoneInput = screen.getByLabelText(/telefone/i);
    await userEvent.type(phoneInput, '123'); // Telefone muito curto

    // Aguarda o debounce
    vi.advanceTimersByTime(500);

    expect(await screen.findByText(/telefone inválido/i)).toBeInTheDocument();

    // Corrige o telefone
    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, '11999999999');

    // Aguarda o debounce
    vi.advanceTimersByTime(500);

    expect(screen.queryByText(/telefone inválido/i)).not.toBeInTheDocument();
  });

  it('deve formatar telefone corretamente', async () => {
    render(<ContactForm />);

    const phoneInput = screen.getByLabelText(/telefone/i);
    await userEvent.type(phoneInput, '11999999999');

    expect(phoneInput).toHaveValue('(11) 99999-9999');
  });

  it('deve chamar onSubmit com dados válidos', async () => {
    const onSubmit = vi.fn();
    const onSuccess = vi.fn();
    render(<ContactForm onSubmit={onSubmit} onSuccess={onSuccess} />);

    // Preenche o formulário
    await userEvent.type(screen.getByLabelText(/nome/i), 'João Silva');
    await userEvent.type(screen.getByLabelText(/email/i), 'joao@exemplo.com');
    await userEvent.type(screen.getByLabelText(/telefone/i), '11999999999');
    await userEvent.selectOptions(screen.getByLabelText(/assunto/i), ['eventos']);
    await userEvent.type(screen.getByLabelText(/mensagem/i), 'Esta é uma mensagem de teste.');

    // Aguarda o debounce
    vi.advanceTimersByTime(500);

    // Envia o formulário
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'João Silva',
      email: 'joao@exemplo.com',
      phone: '(11) 99999-9999',
      subject: 'eventos',
      message: 'Esta é uma mensagem de teste.',
    });

    expect(onSuccess).toHaveBeenCalled();
  });

  it('deve mostrar e esconder mensagem de sucesso', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ContactForm onSubmit={onSubmit} />);

    // Preenche e envia o formulário
    await userEvent.type(screen.getByLabelText(/nome/i), 'João Silva');
    await userEvent.type(screen.getByLabelText(/email/i), 'joao@exemplo.com');
    await userEvent.type(screen.getByLabelText(/mensagem/i), 'Esta é uma mensagem de teste.');

    // Aguarda o debounce
    vi.advanceTimersByTime(500);

    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    // Verifica se a mensagem de sucesso aparece
    expect(await screen.findByText(/mensagem enviada com sucesso/i)).toBeInTheDocument();

    // Avança o timer para verificar se a mensagem some
    vi.advanceTimersByTime(5000);

    expect(screen.queryByText(/mensagem enviada com sucesso/i)).not.toBeInTheDocument();
  });

  it('deve tratar erro na submissão', async () => {
    const errorMessage = 'Erro de conexão';
    const onSubmit = vi.fn().mockRejectedValue(new Error(errorMessage));
    const onError = vi.fn();
    render(<ContactForm onSubmit={onSubmit} onError={onError} />);

    // Preenche e envia o formulário
    await userEvent.type(screen.getByLabelText(/nome/i), 'João Silva');
    await userEvent.type(screen.getByLabelText(/email/i), 'joao@exemplo.com');
    await userEvent.type(screen.getByLabelText(/mensagem/i), 'Esta é uma mensagem de teste.');

    // Aguarda o debounce
    vi.advanceTimersByTime(500);

    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));

    expect(onError).toHaveBeenCalledWith(errorMessage);
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });
});