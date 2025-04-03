import React from "react";
import { useControls, button, folder } from "leva";
import type { Theme } from "../types/theme";

interface ThemeControls {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  spacing: {
    base: number;
  };
  borderRadius: {
    base: number;
  };
}

export const DevTools: React.FC = () => {
  const defaultTheme: Partial<Theme> = {
    colors: {
      primary: { DEFAULT: "#3b82f6" },
      secondary: { DEFAULT: "#10b981" },
      background: { DEFAULT: "#ffffff" },
      text: { DEFAULT: "#1f2937" },
    },
    spacing: { base: 4 },
    borderRadius: { base: 4 },
  };

  const controls = useControls({
    colors: folder({
      primary: { value: defaultTheme.colors?.primary?.DEFAULT || "#3b82f6" },
      secondary: {
        value: defaultTheme.colors?.secondary?.DEFAULT || "#10b981",
      },
      background: {
        value: defaultTheme.colors?.background?.DEFAULT || "#ffffff",
      },
      text: { value: defaultTheme.colors?.text?.DEFAULT || "#1f2937" },
    }),
    spacing: folder({
      base: { value: 4, min: 0, max: 16, step: 1 },
    }),
    borderRadius: folder({
      base: { value: 4, min: 0, max: 24, step: 1 },
    }),
    resetTheme: button(() => {
      // Reset theme to default values
      Object.assign(controls, {
        colors: {
          primary: defaultTheme.colors?.primary?.DEFAULT || "#3b82f6",
          secondary: defaultTheme.colors?.secondary?.DEFAULT || "#10b981",
          background: defaultTheme.colors?.background?.DEFAULT || "#ffffff",
          text: defaultTheme.colors?.text?.DEFAULT || "#1f2937",
        },
        spacing: { base: 4 },
        borderRadius: { base: 4 },
      });
    }),
  });

  return null; // DevTools não renderiza nada visualmente
};
