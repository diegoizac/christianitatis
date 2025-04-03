import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage Hook", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should return initial value when no value is stored", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));
    expect(result.current[0]).toBe("initial");
  });

  it("should return stored value", () => {
    window.localStorage.setItem("test-key", JSON.stringify("stored value"));
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));
    expect(result.current[0]).toBe("stored value");
  });

  it("should update stored value", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));

    act(() => {
      result.current[1]("new value");
    });

    expect(result.current[0]).toBe("new value");
    expect(JSON.parse(window.localStorage.getItem("test-key") || "")).toBe(
      "new value"
    );
  });

  it("should handle storing objects", () => {
    const testObject = { test: "value" };
    const { result } = renderHook(() =>
      useLocalStorage("test-key", testObject)
    );

    act(() => {
      result.current[1]({ test: "new value" });
    });

    expect(result.current[0]).toEqual({ test: "new value" });
    expect(JSON.parse(window.localStorage.getItem("test-key") || "")).toEqual({
      test: "new value",
    });
  });

  it("should handle functional updates", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(JSON.parse(window.localStorage.getItem("test-key") || "")).toBe(1);
  });
});
