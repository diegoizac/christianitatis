import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactFormData } from '../types/forms';

type ValidationErrors = Record<string, string>;

export function useFormValidation() {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePhone = useCallback((phone: string | undefined): boolean => {
    if (!phone) return true; // Telefone é opcional
    const phoneNumbers = phone.replace(/\D/g, '');
    return phoneNumbers.length >= 10 && phoneNumbers.length <= 11;
  }, []);

  const validateContactForm = useCallback((data: ContactFormData): boolean => {
    const newErrors: ValidationErrors = {};

    // Validação de nome
    if (!data.name) {
      newErrors.name = t('form.errors.nameRequired');
    } else if (data.name.length < 3) {
      newErrors.name = t('form.errors.nameMinLength');
    }

    // Validação de email
    if (!data.email) {
      newErrors.email = t('form.errors.emailRequired');
    } else if (!validateEmail(data.email)) {
      newErrors.email = t('form.errors.emailInvalid');
    }

    // Validação de telefone (opcional)
    if (data.phone && !validatePhone(data.phone)) {
      newErrors.phone = t('form.errors.phoneInvalid');
    }

    // Validação de mensagem
    if (!data.message) {
      newErrors.message = t('form.errors.messageRequired');
    } else if (data.message.length < 10) {
      newErrors.message = t('form.errors.messageMinLength');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [t, validateEmail, validatePhone]);

  return {
    errors,
    setErrors,
    validateContactForm,
    validateEmail,
    validatePhone,
  };
}