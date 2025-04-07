import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from '.'

describe('Card Component', () => {
  it('should render basic card with title and content', () => {
    render(
      <Card title="Test Title">
        <p>Test Content</p>
      </Card>
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should render card with subtitle', () => {
    render(
      <Card title="Test Title" subtitle="Test Subtitle">
        <p>Test Content</p>
      </Card>
    )

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  it('should render card with tags', () => {
    const tags = ['Tag 1', 'Tag 2']

    render(
      <Card title="Test Title" tags={tags}>
        <p>Test Content</p>
      </Card>
    )

    tags.forEach(tag => {
      expect(screen.getByText(`#${tag}`)).toBeInTheDocument()
    })
  })

  it('should render card with image', () => {
    const imageUrl = 'test-image.jpg'

    render(
      <Card title="Test Title" image={imageUrl}>
        <p>Test Content</p>
      </Card>
    )

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', imageUrl)
  })

  it('should render card with link', () => {
    render(
      <Card title="Test Title" href="/test">
        <p>Test Content</p>
      </Card>
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test')
  })

  it('should apply custom className', () => {
    render(
      <Card title="Test Title" className="custom-class">
        <p>Test Content</p>
      </Card>
    )

    const card = screen.getByTestId('card')
    expect(card).toHaveClass('custom-class')
  })
})
