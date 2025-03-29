import { securityConfig } from "../../config/security.config";
import { Request, Response, NextFunction } from "express";

const rateLimitStore: { [key: string]: { count: number; resetTime: number } } =
  {};

export const securityMiddleware = {
  cors: (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;
    if (securityConfig.cors.origin.includes(origin || "")) {
      res.setHeader("Access-Control-Allow-Origin", origin || "");
      res.setHeader(
        "Access-Control-Allow-Methods",
        securityConfig.cors.methods.join(", ")
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        securityConfig.cors.allowedHeaders.join(", ")
      );
      res.setHeader(
        "Access-Control-Expose-Headers",
        securityConfig.cors.exposedHeaders.join(", ")
      );
      res.setHeader(
        "Access-Control-Max-Age",
        securityConfig.cors.maxAge.toString()
      );

      if (securityConfig.cors.credentials) {
        res.setHeader("Access-Control-Allow-Credentials", "true");
      }
    }
    next();
  },

  csrf: (req: Request, res: Response, next: NextFunction) => {
    if (!securityConfig.csrf.enabled) {
      next();
      return;
    }

    const token = req.cookies?.[securityConfig.csrf.cookieName];
    const headerToken =
      req.headers[securityConfig.csrf.headerName.toLowerCase()];

    if (token !== headerToken) {
      res.status(403).json({ error: "CSRF token inválido" });
      return;
    }

    next();
  },

  rateLimit: (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    const now = Date.now();

    if (!rateLimitStore[ip]) {
      rateLimitStore[ip] = {
        count: 1,
        resetTime: now + securityConfig.rateLimit.windowMs,
      };
      next();
      return;
    }

    const userLimit = rateLimitStore[ip];

    if (now > userLimit.resetTime) {
      userLimit.count = 1;
      userLimit.resetTime = now + securityConfig.rateLimit.windowMs;
      next();
      return;
    }

    if (userLimit.count >= securityConfig.rateLimit.max) {
      res.status(429).json({ error: securityConfig.rateLimit.message });
      return;
    }

    userLimit.count++;
    next();
  },

  securityHeaders: (_req: Request, res: Response, next: NextFunction) => {
    Object.entries(securityConfig.headers).forEach(([header, value]) => {
      res.setHeader(header, value);
    });
    next();
  },

  all: (req: Request, res: Response, next: NextFunction) => {
    // Aplica todos os middlewares em sequência
    securityMiddleware.cors(req, res, () => {
      securityMiddleware.csrf(req, res, () => {
        securityMiddleware.rateLimit(req, res, () => {
          securityMiddleware.securityHeaders(req, res, next);
        });
      });
    });
  },
};
