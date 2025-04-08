import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../components/Button'

const meta = {
  title: 'Componentes/Botão',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: 'Variação do botão',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tamanho do botão',
    },
    disabled: {
      control: 'boolean',
      description: 'Define se o botão está desabilitado',
    },
    children: {
      control: 'text',
      description: 'Conteúdo do botão',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primário: Story = {
  args: {
    variant: 'primary',
    children: 'Botão Primário',
  },
}

export const Secundário: Story = {
  args: {
    variant: 'secondary',
    children: 'Botão Secundário',
  },
}

export const Contorno: Story = {
  args: {
    variant: 'outline',
    children: 'Botão com Contorno',
  },
}

export const Desabilitado: Story = {
  args: {
    disabled: true,
    children: 'Botão Desabilitado',
  },
}
