export interface SecurityConfig {
  auth: {
    tokenExpiration: string;
    refreshTokenExpiration: string;
    passwordMinLength: number;
    passwordRequirements: {
      uppercase: boolean;
      lowercase: boolean;
      numbers: boolean;
      specialChars: boolean;
    };
    maxLoginAttempts: number;
    lockoutDuration: number;
  };
  cors: {
    origin: string[];
    methods: string[];
    allowedHeaders: string[];
    exposedHeaders: string[];
    credentials: boolean;
    maxAge: number;
  };
  csrf: {
    enabled: boolean;
    cookieName: string;
    headerName: string;
  };
  rateLimit: {
    windowMs: number;
    max: number;
    message: string;
  };
  sanitization: {
    allowedTags: string[];
    allowedAttributes: {
      [key: string]: string[];
    };
  };
  headers: {
    [key: string]: string;
  };
}
