import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useForm } from "./useForm";

describe("useForm Hook", () => {
  const formConfig = {
    email: {
      initialValue: "",
      validate: [
        {
          validate: (value: string) => value.includes("@"),
          message: "Email inválido",
        },
      ],
    },
    password: {
      initialValue: "",
      validate: [
        {
          validate: (value: string) => value.length >= 6,
          message: "Senha deve ter no mínimo 6 caracteres",
        },
      ],
    },
  };

  it("should initialize with initial values", () => {
    const { result } = renderHook(() => useForm(formConfig));

    expect(result.current.values).toEqual({
      email: "",
      password: "",
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isDirty).toEqual({});
  });

  it("should update values and validate on change", () => {
    const { result } = renderHook(() => useForm(formConfig));

    act(() => {
      result.current.handleChange("email", "test");
    });

    expect(result.current.values.email).toBe("test");
    expect(result.current.errors.email).toBe("Email inválido");
    expect(result.current.isDirty.email).toBe(true);
  });

  it("should clear errors when valid value is provided", () => {
    const { result } = renderHook(() => useForm(formConfig));

    act(() => {
      result.current.handleChange("email", "test@example.com");
    });

    expect(result.current.values.email).toBe("test@example.com");
    expect(result.current.errors.email).toBeUndefined();
  });

  it("should validate all fields on submit", () => {
    const { result } = renderHook(() => useForm(formConfig));
    const onSubmit = vi.fn();

    act(() => {
      result.current.handleSubmit(onSubmit)();
    });

    expect(result.current.errors).toEqual({
      email: "Email inválido",
      password: "Senha deve ter no mínimo 6 caracteres",
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should call onSubmit when form is valid", () => {
    const { result } = renderHook(() => useForm(formConfig));
    const onSubmit = vi.fn();

    act(() => {
      result.current.handleChange("email", "test@example.com");
      result.current.handleChange("password", "123456");
    });

    act(() => {
      result.current.handleSubmit(onSubmit)();
    });

    expect(result.current.errors).toEqual({});
    expect(onSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "123456",
    });
  });

  it("should reset form state", () => {
    const { result } = renderHook(() => useForm(formConfig));

    act(() => {
      result.current.handleChange("email", "test@example.com");
      result.current.handleChange("password", "123456");
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.values).toEqual({
      email: "",
      password: "",
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isDirty).toEqual({});
  });

  it("should handle multiple validation rules", () => {
    const configWithMultipleRules = {
      password: {
        initialValue: "",
        validate: [
          {
            validate: (value: string) => value.length >= 6,
            message: "Senha deve ter no mínimo 6 caracteres",
          },
          {
            validate: (value: string) => /[A-Z]/.test(value),
            message: "Senha deve ter pelo menos uma letra maiúscula",
          },
        ],
      },
    };

    const { result } = renderHook(() => useForm(configWithMultipleRules));

    act(() => {
      result.current.handleChange("password", "12345");
    });

    expect(result.current.errors.password).toBe(
      "Senha deve ter no mínimo 6 caracteres"
    );

    act(() => {
      result.current.handleChange("password", "123456");
    });

    expect(result.current.errors.password).toBe(
      "Senha deve ter pelo menos uma letra maiúscula"
    );

    act(() => {
      result.current.handleChange("password", "123456A");
    });

    expect(result.current.errors.password).toBeUndefined();
  });
});
