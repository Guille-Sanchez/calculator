import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

describe('Calculator', () => {
  it('Should have a title', () => {
    render(<App/>)

    const title = screen.getByText('Calculator')
    expect(title).toBeDefined()
  })

  it('Should render all keys', () => {
    render(<App/>)

    const keys = screen.getAllByLabelText('calculator-keys')
    expect(keys).toHaveLength(18)
  })

  it('Should render have 5 rows', () => {
    render(<App/>)

    const rows = screen.getAllByLabelText('calculator-row')
    expect(rows).toHaveLength(5)
  })

  it('Should render an input', () => {
    render(<App/>)

    const input = screen.getByRole('textbox')
    expect(input).toBeDefined()
  })

  it('Should render an number', () => {
    render(<App/>)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('7')
  })

  it('Should render an operand', () => {
    render(<App/>)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const plus = screen.getByText('+')
    fireEvent.click(plus)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('+')
  })

  it('Should render a second number', () => {
    render(<App/>)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const plus = screen.getByText('+')
    fireEvent.click(plus)

    const five = screen.getByText('5')
    fireEvent.click(five)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('5')
  })

  it('Should solve an equation with only one digit in each side', () => {
    render(<App/>)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const plus = screen.getByText('+')
    fireEvent.click(plus)

    const five = screen.getByText('5')
    fireEvent.click(five)

    const equal = screen.getByText('=')
    fireEvent.click(equal)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('12')
  })

  it('Should solve an equation with multiple digits in each side', () => {
    render(<App/>)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const five = screen.getByText('5')
    fireEvent.click(five)

    const plus = screen.getByText('*')
    fireEvent.click(plus)

    fireEvent.click(five)

    const equal = screen.getByText('=')
    fireEvent.click(equal)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('375')
  })
})
