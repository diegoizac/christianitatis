import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../contexts/AuthContext";

const registerSchema = z
  .object({
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
  onLoginClick?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onLoginClick,
}) => {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const { error } = await signUp(data.email, data.password);

      if (error) {
        setError("root", { message: error.message });
        return;
      }

      onSuccess?.();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="register-email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          id="register-email"
          name="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="seu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Senha
        </label>
        <input
          {...register("password")}
          type="password"
          id="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="******"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirmar Senha
        </label>
        <input
          {...register("confirmPassword")}
          type="password"
          id="confirmPassword"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="******"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
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
          Já tem uma conta? Faça login
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
      >
        {isLoading ? "Criando conta..." : "Criar conta"}
      </button>
    </form>
  );
};

export default RegisterForm;
