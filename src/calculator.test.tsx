import { describe, it, expect } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import App from './App'

afterEach(cleanup)

describe('Calculator', () => {
  afterEach(cleanup)
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

  it('Should render 5 rows', () => {
    render(<App/>)

    const rows = screen.getAllByLabelText('calculator-row')
    expect(rows).toHaveLength(5)
  })

  it('Should render an input', () => {
    render(<App/>)

    const input = screen.getByRole('textbox')
    expect(input).toBeDefined()
  })
})

describe('Basic operations', () => {
  it('Should render a positive number', () => {
    render(<App/>)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('7')
  })

  it('Should render a negative number', () => {
    render(<App/>)

    const subtract = screen.getByText('-')
    fireEvent.click(subtract)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('-7')
  })

  it('Should render an operand if first value is positive', () => {
    render(<App/>)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const plus = screen.getByText('+')
    fireEvent.click(plus)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('+')
  })

  it('Should render an operand if first value is negative', () => {
    render(<App/>)

    const subtract = screen.getByText('-')
    fireEvent.click(subtract)

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

  it('Should solve a positive equation with only one digit in each side', () => {
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

  it('Should solve a negative equation with only one digit in each side', () => {
    render(<App/>)

    const subtract = screen.getByText('-')
    fireEvent.click(subtract)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    fireEvent.click(subtract)

    fireEvent.click(subtract)
    const five = screen.getByText('5')
    fireEvent.click(five)

    const equal = screen.getByText('=')
    fireEvent.click(equal)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('-2')
  })

  it('Should solve an equation with multiple digits in each side', () => {
    render(<App/>)

    const subtract = screen.getByText('-')
    fireEvent.click(subtract)

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
    expect(input.value).toBe('-375')
  })
})

describe('Especial keys operation', () => {
  afterEach(cleanup)
  it('Should not display delete if pressed without any previous input', () => {
    render(<App/>)

    const del = screen.getByText('DEL')
    fireEvent.click(del)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('')
  })

  it('Should delete the first value of first operand', () => {
    render(<App/>)
    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const del = screen.getByText('DEL')
    fireEvent.click(del)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('')
  })

  it('Should delete operand and add a new operand after', () => {
    render(<App/>)

    const subtract = screen.getByText('-')
    fireEvent.click(subtract)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const five = screen.getByText('5')
    fireEvent.click(five)

    const plus = screen.getByText('*')
    fireEvent.click(plus)

    const del = screen.getByText('DEL')
    fireEvent.click(del)

    fireEvent.click(subtract)

    fireEvent.click(five)

    const equal = screen.getByText('=')
    fireEvent.click(equal)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('-80')
  })

  it('Should render an error if input is wrong', () => {
    render(<App/>)

    const subtract = screen.getByText('-')
    fireEvent.click(subtract)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const five = screen.getByText('5')
    fireEvent.click(five)

    fireEvent.click(subtract)

    const multiply = screen.getByText('*')
    fireEvent.click(multiply)

    fireEvent.click(five)

    const equal = screen.getByText('=')
    fireEvent.click(equal)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('SYNTAX ERROR')
  })
})

describe('Erros', () => {
  afterEach(cleanup)

  it('Should display syntax error if input is blank', () => {
    render(<App />)
    const equal = screen.getByText('=')
    fireEvent.click(equal)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('SYNTAX ERROR')
  })

  it('Should render the second number with its operand if operand is already decided for that equation', () => {
    render(<App/>)

    const subtract = screen.getByText('-')
    fireEvent.click(subtract)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const five = screen.getByText('5')
    fireEvent.click(five)

    fireEvent.click(subtract)

    fireEvent.click(subtract)
    fireEvent.click(five)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('-5')
  })

  it('Should render an error if input is wrong', () => {
    render(<App/>)

    const subtract = screen.getByText('-')
    fireEvent.click(subtract)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const five = screen.getByText('5')
    fireEvent.click(five)

    fireEvent.click(subtract)

    const multiply = screen.getByText('*')
    fireEvent.click(multiply)

    fireEvent.click(five)

    const equal = screen.getByText('=')
    fireEvent.click(equal)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('SYNTAX ERROR')
  })
})

describe('New Equation', () => {
  afterEach(cleanup)

  it('Should continue to write on previous answer', () => {
    render(<App/>)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const plus = screen.getByText('+')
    fireEvent.click(plus)

    const five = screen.getByText('5')
    fireEvent.click(five)

    const equal = screen.getByText('=')
    fireEvent.click(equal)

    fireEvent.click(five)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('125')
  })

  it('Should be able to use previous answer', () => {
    render(<App/>)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const plus = screen.getByText('+')
    fireEvent.click(plus)

    const five = screen.getByText('5')
    fireEvent.click(five)

    const equal = screen.getByText('=')
    fireEvent.click(equal)

    fireEvent.click(plus)
    fireEvent.click(five)
    fireEvent.click(equal)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('17')
  })

  it('Should be able to alter previous answer', () => {
    render(<App/>)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const plus = screen.getByText('+')
    fireEvent.click(plus)

    const five = screen.getByText('5')
    fireEvent.click(five)

    const equal = screen.getByText('=')
    fireEvent.click(equal)

    fireEvent.click(five)

    fireEvent.click(plus)
    fireEvent.click(five)
    fireEvent.click(equal)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('130')
  })

  it('Should initialize argument if SYNTAX ERROR is on the screen', () => {
    render(<App/>)

    const seven = screen.getByText('7')
    fireEvent.click(seven)

    const plus = screen.getByText('+')
    fireEvent.click(plus)

    const equal = screen.getByText('=')
    fireEvent.click(equal)

    const five = screen.getByText('5')
    fireEvent.click(five)

    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input.value).toBe('5')
  })
})
