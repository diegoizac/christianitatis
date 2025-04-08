import { global as globalThis } from '@storybook/global'
import { setCustomElements } from '@storybook/web-components'

// Configuração do idioma português
const customViewports = {
  toolbar: {
    title: 'Visualização',
    icon: 'mobile',
    items: [
      { value: 'responsive', title: 'Responsivo' },
      { value: 'desktop', title: 'Desktop' },
      { value: 'tablet', title: 'Tablet' },
      { value: 'mobile', right: 'Celular' },
    ],
  },
  toolbars: {
    'storybook/background': {
      title: 'Fundo',
      icon: 'photo',
      items: [
        { value: 'light', title: 'Claro' },
        { value: 'dark', title: 'Escuro' },
      ],
    },
    'storybook/viewport': {
      title: 'Visualização',
    },
    'storybook/actions': {
      title: 'Ações',
    },
    'storybook/controls': {
      title: 'Controles',
    },
  },
  manager: {
    'auth/logout': 'Sair',
    'auth/login': 'Entrar',
    'auth/register': 'Registrar',
    'auth/forgot': 'Esqueceu a senha?',
    'sidebar/search': 'Buscar...',
    'sidebar/stories': 'Histórias',
    'sidebar/components': 'Componentes',
    'sidebar/settings': 'Configurações',
  },
}

// Aplica as traduções
globalThis.STORYBOOK_REACT_STRINGS = customViewports

// Exporta a configuração
export const parameters = {
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
    messages: customViewports,
  },
}
