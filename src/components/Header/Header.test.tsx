import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("deve renderizar o logo", () => {
    render(<Header />);
    const logo = screen.getByAltText("Christianitatis");
    expect(logo).toBeInTheDocument();
  });

  it("deve ter a classe scrolled quando scroll > 50", () => {
    render(<Header />);
    const header = screen.getByRole("banner");

    // Simula scroll
    global.window.scrollY = 51;
    fireEvent.scroll(window);

    expect(header).toHaveClass("scrolled");
  });

  it("deve abrir o menu mobile ao clicar no botão", () => {
    render(<Header />);
    const menuButton = screen.getByLabelText("Menu");

    fireEvent.click(menuButton);

    const mobileMenu = screen.getByRole("navigation");
    expect(mobileMenu).toHaveClass("open");
  });

  it("deve fechar o menu mobile ao clicar novamente", () => {
    render(<Header />);
    const menuButton = screen.getByLabelText("Menu");

    // Abre o menu
    fireEvent.click(menuButton);
    // Fecha o menu
    fireEvent.click(menuButton);

    const mobileMenu = screen.getByRole("navigation");
    expect(mobileMenu).not.toHaveClass("open");
  });
});
