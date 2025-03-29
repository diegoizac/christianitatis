import { validatePassword } from "../auth";
import { sanitizeHTML, sanitizeInput, escapeSQL } from "../sanitization";
import { AuthError } from "../auth";

describe("Funções de Autenticação", () => {
  describe("validatePassword", () => {
    it("deve aceitar uma senha válida", () => {
      const validPassword = "Test@123";
      expect(() => validatePassword(validPassword)).not.toThrow();
    });

    it("deve rejeitar uma senha muito curta", () => {
      const shortPassword = "123";
      expect(() => validatePassword(shortPassword)).toThrow(AuthError);
    });

    it("deve rejeitar uma senha sem maiúsculas", () => {
      const noUppercase = "test@123";
      expect(() => validatePassword(noUppercase)).toThrow(AuthError);
    });

    it("deve rejeitar uma senha sem caracteres especiais", () => {
      const noSpecial = "Test123";
      expect(() => validatePassword(noSpecial)).toThrow(AuthError);
    });
  });
});

describe("Funções de Sanitização", () => {
  describe("sanitizeHTML", () => {
    it("deve remover tags HTML não permitidas", () => {
      const dirty = '<script>alert("xss")</script><p>texto seguro</p>';
      const clean = sanitizeHTML(dirty);
      expect(clean).toBe("<p>texto seguro</p>");
    });

    it("deve manter tags HTML permitidas", () => {
      const valid = "<strong>texto em negrito</strong>";
      const clean = sanitizeHTML(valid);
      expect(clean).toBe(valid);
    });
  });

  describe("sanitizeInput", () => {
    it("deve remover caracteres especiais", () => {
      const input = "texto com <script> e 'aspas'";
      const clean = sanitizeInput(input);
      expect(clean).not.toContain("<");
      expect(clean).not.toContain(">");
      expect(clean).not.toContain("'");
    });
  });

  describe("escapeSQL", () => {
    it("deve escapar caracteres SQL especiais", () => {
      const input = "texto com 'aspas' e \\backslash";
      const escaped = escapeSQL(input);
      expect(escaped).toContain("\\'");
      expect(escaped).toContain("\\\\");
    });

    it("deve retornar o mesmo valor para não-strings", () => {
      const input = 123;
      const escaped = escapeSQL(input as any);
      expect(escaped).toBe(input);
    });
  });
});
