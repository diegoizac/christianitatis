import { securityConfig } from "../../config/security.config";
import DOMPurify from "dompurify";

export const sanitizeHTML = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: securityConfig.sanitization.allowedTags,
    ALLOWED_ATTR: Object.entries(
      securityConfig.sanitization.allowedAttributes
    ).flatMap(([_, attrs]) => attrs),
  });
};

export const sanitizeInput = (input: string): string => {
  // Remove caracteres potencialmente perigosos
  return input.replace(/[<>'"]/g, "");
};

export const escapeSQL = (value: string): string => {
  if (typeof value !== "string") {
    return value;
  }
  return value.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case "\0":
        return "\\0";
      case "\x08":
        return "\\b";
      case "\x09":
        return "\\t";
      case "\x1a":
        return "\\z";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case '"':
      case "'":
      case "\\":
      case "%":
        return "\\" + char; // prepends a backslash to backslash, percent, and double/single quotes
      default:
        return char;
    }
  });
};
