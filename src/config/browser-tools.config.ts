import { BrowserToolsConfig } from '../types/browser-tools'

export const browserToolsConfig: BrowserToolsConfig = {
  enableConsoleLogging: true,
  enableNetworkLogging: true,
  enablePerformanceAudit: true,
  enableAccessibilityAudit: true,
  enableSEOAudit: true,
  enableBestPracticesAudit: true,
  enableNextJSAudit: false, // Desabilitado pois usamos Vite
  debuggerMode: true,
}

// Função simplificada que não depende de funções externas
export const initBrowserTools = async () => {
  console.log('Browser tools initialized with config:', browserToolsConfig)
}
