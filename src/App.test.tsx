import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(document.querySelector('.main-container')).toBeTruthy()
  })

  it('contains header component', () => {
    render(<App />)
    const header = document.querySelector('header')
    expect(header).toBeTruthy()
  })

  it('contains footer component', () => {
    render(<App />)
    const footer = document.querySelector('footer')
    expect(footer).toBeTruthy()
  })
})
