import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Section from '.'

describe('Section Component', () => {
  it('should render section with title', () => {
    render(
      <Section title="Test Title">
        <p>Test content</p>
      </Section>
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('should render section with subtitle', () => {
    render(
      <Section title="Test Title" subtitle="Test Subtitle">
        <p>Test content</p>
      </Section>
    )

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(
      <Section title="Test Title" className="custom-class">
        <p>Test content</p>
      </Section>
    )

    const section = screen.getByRole('region')
    expect(section).toHaveClass('custom-class')
  })

  it('should apply id attribute', () => {
    render(
      <Section title="Test Title" id="test-section">
        <p>Test content</p>
      </Section>
    )

    const section = screen.getByRole('region')
    expect(section).toHaveAttribute('id', 'test-section')
  })

  it('should apply alternate variant styles', () => {
    render(
      <Section title="Test Title" variant="alternate">
        <p>Test content</p>
      </Section>
    )

    const section = screen.getByRole('region')
    expect(section).toHaveClass('bg-gray-50')
  })
})
