import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../contexts/AuthContext";

const resetPasswordSchema = z.object({
  email: z.string().email("Email inválido"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  onSuccess?: () => void;
  onLoginClick?: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSuccess,
  onLoginClick,
}) => {
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setIsLoading(true);
      const { error } = await resetPassword(data.email);

      if (error) {
        setError("root", { message: error.message });
        return;
      }

      setIsEmailSent(true);
      onSuccess?.();
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">Email enviado!</h3>
        <p className="mt-2 text-sm text-gray-600">
          Verifique sua caixa de entrada e siga as instruções para redefinir sua
          senha.
        </p>
        <button
          onClick={onLoginClick}
          className="mt-4 text-sm text-primary-600 hover:text-primary-500"
        >
          Voltar para o login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Recuperar senha</h3>
        <p className="mt-2 text-sm text-gray-600">
          Digite seu email para receber as instruções de recuperação de senha.
        </p>
      </div>

      <div>
        <label
          htmlFor="reset-email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          id="reset-email"
          name="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="seu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {errors.root && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-600">{errors.root.message}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onLoginClick}
          className="text-sm text-primary-600 hover:text-primary-500"
        >
          Voltar para o login
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
      >
        {isLoading ? "Enviando..." : "Enviar instruções"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
