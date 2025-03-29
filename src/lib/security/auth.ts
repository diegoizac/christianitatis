import { securityConfig } from "../../config/security.config";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.VITE_JWT_SECRET || "your-secret-key";
const REFRESH_SECRET = process.env.VITE_REFRESH_SECRET || "your-refresh-secret";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export const validatePassword = (password: string): boolean => {
  if (password.length < securityConfig.auth.passwordMinLength) {
    throw new AuthError(
      `A senha deve ter no mínimo ${securityConfig.auth.passwordMinLength} caracteres`
    );
  }

  const { uppercase, lowercase, numbers, specialChars } =
    securityConfig.auth.passwordRequirements;

  if (uppercase && !/[A-Z]/.test(password)) {
    throw new AuthError("A senha deve conter pelo menos uma letra maiúscula");
  }

  if (lowercase && !/[a-z]/.test(password)) {
    throw new AuthError("A senha deve conter pelo menos uma letra minúscula");
  }

  if (numbers && !/\d/.test(password)) {
    throw new AuthError("A senha deve conter pelo menos um número");
  }

  if (specialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    throw new AuthError("A senha deve conter pelo menos um caractere especial");
  }

  return true;
};

export const generateToken = async (userId: string): Promise<string> => {
  try {
    return jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: securityConfig.auth.tokenExpiration,
    });
  } catch (error) {
    throw new AuthError("Erro ao gerar token JWT");
  }
};

export const verifyToken = async (token: string): Promise<any> => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AuthError("Token expirado");
    }
    throw new AuthError("Token inválido");
  }
};

export const generateRefreshToken = async (userId: string): Promise<string> => {
  try {
    return jwt.sign({ userId }, REFRESH_SECRET, {
      expiresIn: securityConfig.auth.refreshTokenExpiration,
    });
  } catch (error) {
    throw new AuthError("Erro ao gerar refresh token");
  }
};

let loginAttempts: { [key: string]: { count: number; lastAttempt: number } } =
  {};

export const checkLoginAttempts = (userId: string): void => {
  const now = Date.now();
  const userAttempts = loginAttempts[userId];

  if (userAttempts) {
    // Verifica se o período de bloqueio já passou
    if (
      now - userAttempts.lastAttempt >
      securityConfig.auth.lockoutDuration * 60 * 1000
    ) {
      delete loginAttempts[userId];
      return;
    }

    if (userAttempts.count >= securityConfig.auth.maxLoginAttempts) {
      throw new AuthError(
        "Conta temporariamente bloqueada. Tente novamente mais tarde."
      );
    }
  }
};

export const incrementLoginAttempts = (userId: string): void => {
  const now = Date.now();

  if (!loginAttempts[userId]) {
    loginAttempts[userId] = { count: 1, lastAttempt: now };
  } else {
    loginAttempts[userId].count++;
    loginAttempts[userId].lastAttempt = now;
  }
};
