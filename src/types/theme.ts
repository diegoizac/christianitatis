export interface Theme {
  colors: {
    primary: {
      DEFAULT: string;
      hover?: string;
    };
    secondary: {
      DEFAULT: string;
      hover?: string;
    };
    background: {
      DEFAULT: string;
      dark?: string;
    };
    text: {
      DEFAULT: string;
      light?: string;
    };
  };
  spacing: {
    base?: number;
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  borderRadius: {
    base?: number;
    sm?: string;
    md?: string;
    lg?: string;
    full?: string;
  };
  typography: {
    h1?: {
      fontSize: string;
      fontWeight: string;
      lineHeight: string;
    };
    h2?: {
      fontSize: string;
      fontWeight: string;
      lineHeight: string;
    };
    body?: {
      fontSize: string;
      fontWeight: string;
      lineHeight: string;
    };
  };
  animation: {
    fast?: string;
    normal?: string;
    slow?: string;
  };
}
