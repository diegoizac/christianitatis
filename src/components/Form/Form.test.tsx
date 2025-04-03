import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Form } from ".";
import { Input } from "../Input";

describe("Form Component", () => {
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

  it("should render children correctly", () => {
    render(
      <Form config={formConfig} onSubmit={() => {}}>
        <Input name="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Senha" />
      </Form>
    );

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
  });

  it("should render with render props pattern", () => {
    render(
      <Form config={formConfig} onSubmit={() => {}}>
        {({ values, errors, handleChange }) => (
          <>
            <Input
              name="email"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
              placeholder="Email"
            />
            <Input
              name="password"
              type="password"
              value={values.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
              placeholder="Senha"
            />
          </>
        )}
      </Form>
    );

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
  });

  it("should handle form submission with validation", async () => {
    const handleSubmit = vi.fn();

    render(
      <Form config={formConfig} onSubmit={handleSubmit}>
        <Input name="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Senha" />
        <button type="submit">Enviar</button>
      </Form>
    );

    fireEvent.click(screen.getByText("Enviar"));
    expect(handleSubmit).not.toHaveBeenCalled();

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Senha");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.click(screen.getByText("Enviar"));

    expect(handleSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "123456",
    });
  });

  it("should automatically bind input values and errors", () => {
    render(
      <Form config={formConfig} onSubmit={() => {}}>
        <Input name="email" placeholder="Email" />
      </Form>
    );

    const input = screen.getByPlaceholderText("Email");
    fireEvent.change(input, { target: { value: "invalid-email" } });

    expect(input).toHaveValue("invalid-email");
    expect(screen.getByText("Email inválido")).toBeInTheDocument();
  });

  it("should handle nested inputs", () => {
    render(
      <Form config={formConfig} onSubmit={() => {}}>
        <div>
          <Input name="email" placeholder="Email" />
          <div>
            <Input name="password" type="password" placeholder="Senha" />
          </div>
        </div>
      </Form>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Senha");

    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "12345" } });

    expect(screen.getByText("Email inválido")).toBeInTheDocument();
    expect(
      screen.getByText("Senha deve ter no mínimo 6 caracteres")
    ).toBeInTheDocument();
  });
});
