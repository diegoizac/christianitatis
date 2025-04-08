import type { Meta, StoryObj } from '@storybook/react'
import Section from './index'

const meta = {
  title: 'Components/Section',
  component: Section,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'alternate'],
    },
  },
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof Section>

export const Default: Story = {
  args: {
    title: 'Seção Padrão',
    subtitle: 'Este é um exemplo de seção com estilo padrão',
    children: (
      <div className="p-4">
        <p>Conteúdo da seção aqui...</p>
      </div>
    ),
    variant: 'default',
  },
}

export const Alternate: Story = {
  args: {
    title: 'Seção Alternativa',
    subtitle: 'Este é um exemplo de seção com estilo alternativo',
    children: (
      <div className="p-4">
        <p>Conteúdo da seção aqui...</p>
      </div>
    ),
    variant: 'alternate',
  },
}

export const WithoutTitle: Story = {
  args: {
    children: (
      <div className="p-4">
        <p>Seção sem título nem subtítulo</p>
      </div>
    ),
  },
}
