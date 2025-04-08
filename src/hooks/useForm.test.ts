import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useForm, FormConfig } from "./useForm";

type TestForm = {
  email: string;
  password: string;
  name: string;
};

describe("useForm Hook", () => {
  const defaultConfig: FormConfig<TestForm> = {
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
    name: {
      initialValue: "",
      validate: [
        {
          validate: (value: string) => value.length > 0,
          message: "Nome é obrigatório",
        },
      ],
    },
  };

  it("initializes with correct initial values", () => {
    const { result } = renderHook(() => useForm<TestForm>(defaultConfig));

    expect(result.current.values).toEqual({
      email: "",
      password: "",
      name: "",
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isDirty).toEqual({});
  });

  it("handles field changes and validates correctly", () => {
    const { result } = renderHook(() => useForm<TestForm>(defaultConfig));

    act(() => {
      result.current.handleChange("email", "invalid-email");
    });

    expect(result.current.values.email).toBe("invalid-email");
    expect(result.current.errors.email).toBe("Email inválido");
    expect(result.current.isDirty.email).toBe(true);

    act(() => {
      result.current.handleChange("email", "valid@email.com");
    });

    expect(result.current.values.email).toBe("valid@email.com");
    expect(result.current.errors.email).toBeUndefined();
  });

  it("validates form on submit", async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useForm<TestForm>(defaultConfig));
    const event = { preventDefault: vi.fn() } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.handleSubmit(onSubmit)(event);
    });

    expect(onSubmit).not.toHaveBeenCalled();
    expect(result.current.errors).toEqual({
      email: "Email inválido",
      password: "Senha deve ter no mínimo 6 caracteres",
      name: "Nome é obrigatório",
    });

    act(() => {
      result.current.handleChange("email", "test@example.com");
      result.current.handleChange("password", "password123");
      result.current.handleChange("name", "John Doe");
    });

    await act(async () => {
      await result.current.handleSubmit(onSubmit)(event);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
      name: "John Doe",
    });
  });

  it("resets form to initial values", () => {
    const { result } = renderHook(() => useForm<TestForm>(defaultConfig));

    act(() => {
      result.current.handleChange("email", "test@example.com");
      result.current.handleChange("password", "password123");
      result.current.handleChange("name", "John Doe");
    });

    expect(result.current.values).toEqual({
      email: "test@example.com",
      password: "password123",
      name: "John Doe",
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.values).toEqual({
      email: "",
      password: "",
      name: "",
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isDirty).toEqual({});
  });

  it("validates individual fields correctly", () => {
    const { result } = renderHook(() => useForm<TestForm>(defaultConfig));

    act(() => {
      result.current.handleChange("password", "123");
    });

    expect(result.current.errors.password).toBe("Senha deve ter no mínimo 6 caracteres");

    act(() => {
      result.current.handleChange("password", "123456");
    });

    expect(result.current.errors.password).toBeUndefined();
  });

  it("validates entire form correctly", () => {
    const { result } = renderHook(() => useForm<TestForm>(defaultConfig));

    expect(result.current.validateForm()).toBe(false);

    act(() => {
      result.current.handleChange("email", "test@example.com");
      result.current.handleChange("password", "password123");
      result.current.handleChange("name", "John Doe");
    });

    expect(result.current.validateForm()).toBe(true);
  });

  it("tracks dirty state for each field", () => {
    const { result } = renderHook(() => useForm<TestForm>(defaultConfig));

    act(() => {
      result.current.handleChange("email", "test@example.com");
    });

    expect(result.current.isDirty).toEqual({
      email: true,
    });

    act(() => {
      result.current.handleChange("password", "password123");
    });

    expect(result.current.isDirty).toEqual({
      email: true,
      password: true,
    });
  });

  it("handles async submit function", async () => {
    const asyncSubmit = vi.fn().mockImplementation(() => Promise.resolve());
    const { result } = renderHook(() => useForm<TestForm>(defaultConfig));
    const event = { preventDefault: vi.fn() } as unknown as React.FormEvent;

    act(() => {
      result.current.handleChange("email", "test@example.com");
      result.current.handleChange("password", "password123");
      result.current.handleChange("name", "John Doe");
    });

    await act(async () => {
      await result.current.handleSubmit(asyncSubmit)(event);
    });

    expect(asyncSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
      name: "John Doe",
    });
  });
});
