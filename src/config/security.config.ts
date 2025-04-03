import { SecurityConfig } from "../types/security";

export const securityConfig: SecurityConfig = {
  auth: {
    tokenExpiration: "1h",
    refreshTokenExpiration: "7d",
    passwordMinLength: 8,
    passwordRequirements: {
      uppercase: true,
      lowercase: true,
      numbers: true,
      specialChars: true,
    },
    maxLoginAttempts: 5,
    lockoutDuration: 15, // minutos
  },
  cors: {
    origin:
      process.env.VITE_APP_ENV === "production"
        ? ["https://christianitatis.org"]
        : ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["X-Total-Count"],
    credentials: true,
    maxAge: 86400, // 24 horas
  },
  csrf: {
    enabled: true,
    cookieName: "XSRF-TOKEN",
    headerName: "X-XSRF-TOKEN",
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limite por IP
    message: "Muitas requisições deste IP, tente novamente mais tarde",
  },
  sanitization: {
    allowedTags: ["p", "b", "i", "em", "strong", "a"],
    allowedAttributes: {
      a: ["href", "target"],
    },
  },
  headers: {
    "Content-Security-Policy":
      process.env.VITE_APP_ENV === "production"
        ? "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data: https:;"
        : "default-src 'self' 'unsafe-eval'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
  },
};
