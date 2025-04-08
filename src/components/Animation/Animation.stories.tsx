import type { Meta, StoryObj } from '@storybook/react'
import { Animation } from '../Animation'

const meta = {
  title: 'Components/Animation',
  component: Animation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
          Componente de animação 3D que exibe o logo da Christianitatis em um ambiente interativo.
          Utiliza Three.js através do React Three Fiber para renderização 3D e inclui:
          
          - Rotação suave automática
          - Efeito de flutuação
          - Iluminação dinâmica que segue o cursor
          - Materiais metálicos e sombras
          - Controles de câmera interativos
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Animation>

export default meta
type Story = StoryObj<typeof Animation>

export const Default: Story = {
  args: {},
}

export const WithCustomBackground: Story = {
  args: {},
  decorators: [
    Story => (
      <div style={{ background: 'linear-gradient(to bottom, #1a1a1a, #2a2a2a)', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
}
