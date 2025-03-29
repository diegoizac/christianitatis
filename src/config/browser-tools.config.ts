import { BrowserToolsConfig } from "../types/browser-tools";

export const browserToolsConfig: BrowserToolsConfig = {
  enableConsoleLogging: process.env.VITE_APP_ENV === "development",
  enableNetworkLogging: process.env.VITE_APP_ENV === "development",
  enablePerformanceAudit: true,
  enableAccessibilityAudit: true,
  enableSEOAudit: true,
  enableBestPracticesAudit: true,
  enableNextJSAudit: false, // Desabilitado pois usamos Vite
  debuggerMode: process.env.VITE_APP_ENV === "development",
};

export const initBrowserTools = async () => {
  if (process.env.VITE_ENABLE_DEVTOOLS === "true") {
    // Limpa logs anteriores
    await mcp_browser_tools_wipeLogs("");

    // Inicia auditoria em desenvolvimento
    if (process.env.VITE_APP_ENV === "development") {
      await mcp_browser_tools_runAuditMode("");
    }
  }
};
