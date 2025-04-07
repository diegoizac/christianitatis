export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
  phone?: string;
}

export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}