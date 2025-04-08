import type { Meta, StoryObj } from '@storybook/react'
import Button from '.'
import { BrowserRouter, Link } from 'react-router-dom'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          Componente de botão altamente customizável com várias variantes e estados.
          Suporta diferentes tamanhos, estados de loading e pode ser renderizado como um Link.
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'],
      description: 'Variante visual do botão',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Tamanho do botão',
    },
    isLoading: {
      control: 'boolean',
      description: 'Estado de carregamento',
    },
    children: {
      control: 'text',
      description: 'Conteúdo do botão',
    },
    as: {
      control: { type: 'radio', options: ['button', Link] },
      description: 'Componente alternativo (Link)',
    },
    to: {
      control: 'text',
      description: 'URL para o Link',
      if: { arg: 'as', eq: Link },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Botão Primário',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Botão Secundário',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Botão Outline',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Botão Ghost',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Botão de Perigo',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Botão de Sucesso',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Botão Pequeno',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Botão Grande',
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Carregando...',
  },
}

export const AsLink: Story = {
  args: {
    as: Link,
    to: '/exemplo',
    children: 'Link Button',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Botão Desabilitado',
  },
}
