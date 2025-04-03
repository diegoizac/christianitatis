import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from ".";

describe("Card Component", () => {
  it("should render basic card with title and content", () => {
    render(
      <Card title="Test Title">
        <p>Test content</p>
      </Card>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("should render card with subtitle", () => {
    render(
      <Card title="Test Title" subtitle="Test Subtitle">
        <p>Test content</p>
      </Card>
    );

    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("should render card with tags", () => {
    const tags = ["react", "typescript"];

    render(
      <Card title="Test Title" tags={tags}>
        <p>Test content</p>
      </Card>
    );

    tags.forEach((tag) => {
      expect(screen.getByText(`#${tag}`)).toBeInTheDocument();
    });
  });

  it("should render card with image", () => {
    render(
      <Card title="Test Title" image="/test-image.jpg">
        <p>Test content</p>
      </Card>
    );

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "/test-image.jpg");
    expect(image).toHaveAttribute("alt", "Test Title");
  });

  it("should render card with link", () => {
    render(
      <Card title="Test Title" href="https://test.com">
        <p>Test content</p>
      </Card>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://test.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should apply custom className", () => {
    render(
      <Card title="Test Title" className="custom-class">
        <p>Test content</p>
      </Card>
    );

    const card = screen.getByText("Test Title").closest("div");
    expect(card).toHaveClass("custom-class");
  });
});
