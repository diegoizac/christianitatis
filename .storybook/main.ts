import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
    'storybook-react-i18next',
    '@storybook/addon-themes',
    '@storybook/addon-viewport',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    '@storybook/addon-console',
    '@storybook/addon-coverage',
    '@storybook/addon-designs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  typescript: {
    reactDocgen: 'react-docgen',
  },
}
export default config
