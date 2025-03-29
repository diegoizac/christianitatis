import React, { useState, useEffect } from "react";
import { contactService, ContactFormData } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";

interface ContactFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    email: "",
    name: "",
    message: "",
    subject: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const debouncedFormData = useDebounce(formData, 500);

  useEffect(() => {
    validateForm();
  }, [debouncedFormData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "O email é obrigatório";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Digite um email válido";
    }

    // Validação de nome
    if (!formData.name) {
      newErrors.name = "O nome é obrigatório";
    } else if (formData.name.length < 3) {
      newErrors.name = "O nome deve ter pelo menos 3 caracteres";
    }

    // Validação de telefone (opcional)
    if (
      formData.phone &&
      !/^[0-9]{10,11}$/.test(formData.phone.replace(/\D/g, ""))
    ) {
      newErrors.phone = "Digite um telefone válido";
    }

    // Validação de mensagem
    if (!formData.message) {
      newErrors.message = "A mensagem é obrigatória";
    } else if (formData.message.length < 10) {
      newErrors.message = "A mensagem deve ter pelo menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await contactService.submitForm(formData);
      setFormData({ email: "", name: "", message: "", subject: "", phone: "" });
      onSuccess?.();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao enviar formulário";
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      let formatted = numbers;
      if (numbers.length > 2)
        formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      if (numbers.length > 7)
        formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(
          2,
          7
        )}-${numbers.slice(7)}`;
      return formatted;
    }
    return value;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Entre em Contato
      </h2>
      <p className="text-gray-600 mb-8">
        Preencha o formulário abaixo e entraremos em contato o mais breve
        possível.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome */}
        <div className="relative">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Nome Completo <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <i className="fas fa-user"></i>
            </span>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.name
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300"
              }`}
              placeholder="Seu nome completo"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300"
              }`}
              placeholder="seu@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Telefone */}
        <div className="relative">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Telefone
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <i className="fas fa-phone"></i>
            </span>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                const formatted = formatPhone(e.target.value);
                handleChange({
                  ...e,
                  target: { ...e.target, value: formatted },
                });
              }}
              className={`pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300"
              }`}
              placeholder="(00) 00000-0000"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Assunto */}
        <div className="relative">
          <label
            htmlFor="subject"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Assunto
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <i className="fas fa-tag"></i>
            </span>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Selecione um assunto</option>
              <option value="eventos">Eventos</option>
              <option value="duvidas">Dúvidas</option>
              <option value="sugestoes">Sugestões</option>
              <option value="outros">Outros</option>
            </select>
          </div>
        </div>

        {/* Mensagem */}
        <div className="relative">
          <label
            htmlFor="message"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Mensagem <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute top-3 left-3 text-gray-500">
              <i className="fas fa-comment"></i>
            </span>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.message
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300"
              }`}
              placeholder="Digite sua mensagem aqui..."
            />
          </div>
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane"></i>
              <span>Enviar Mensagem</span>
            </>
          )}
        </button>

        {/* Informações de Contato Alternativas */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Você também pode nos contatar através de:
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a
              href="mailto:contato@christianitatis.com"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <i className="fas fa-envelope mr-2"></i>
              contato@christianitatis.com
            </a>
            <a
              href="tel:+5511999999999"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <i className="fas fa-phone mr-2"></i>
              (11) 99999-9999
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;