import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('Calculator', () => {
  it('Should have a title', () => {
    render(<App/>)

    const title = screen.getByText('Calculator')
    expect(title).toBeDefined()
  })
})
