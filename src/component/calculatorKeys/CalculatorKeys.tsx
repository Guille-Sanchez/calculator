import { useRef, useState } from 'react'
import { calculatorKeys, mathOperations, specialKeys } from '../../constants'
import { calculate } from '../../logic/calculate'
import './styles.css'

interface Props {
  equation: string
  setEquation: React.Dispatch<React.SetStateAction<string>>
}

interface HandleProps {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
}

export const CalculatorKeys = ({ equation, setEquation }: Props): JSX.Element => {
  const [firstValue, setFirstValue] = useState<string>('')
  const operation = useRef('')
  const flag = useRef(false)

  const handleOnCLick = ({ e }: HandleProps): void => {
    e.preventDefault()
    const buttonValue: string = e.currentTarget.innerHTML

    switch (buttonValue) {
      case '=':
        const result = calculate({ firstValue, equation, operation })
        setEquation(() => result)
        setFirstValue(() => '')
        operation.current = ''
        break

      case 'RESET':
        setEquation(() => '')
        setFirstValue(() => '')
        operation.current = ''
        break

      case 'DEL':
        if (equation.length > 0 && operation.current === '') {
          const equationArray = equation.split('')
          equationArray.pop()
          setEquation(() => equationArray.join('') ?? '')
        } else if (operation.current !== '') {
          operation.current = ''
          setEquation(() => '')
        } else {
          setEquation(() => '')
        }
        break

      default:
        break
    }

    if (specialKeys.includes(buttonValue)) {
      return
    }

    if (
      ((operation.current === '' && !mathOperations.includes(buttonValue)) ||
      ((buttonValue === '-' && equation.split('').length === 0) && firstValue === '')) &&
      equation !== 'SYNTAX ERROR'
    ) {
      setEquation((prev) => prev + buttonValue)
    } else if (mathOperations.includes(buttonValue) && operation.current === '') {
      setEquation(() => buttonValue)
      if (firstValue === '') {
        setFirstValue(() => equation)
      }
      operation.current = buttonValue
      flag.current = true
    } else if (equation === 'SYNTAX ERROR') {
      setEquation(() => buttonValue)
    } else {
      if (flag.current) {
        setEquation(() => buttonValue)
        flag.current = false
      } else {
        setEquation((prev) => prev + buttonValue)
      }
    }
  }

  return (
    <ul className='calc-body'>
      {
        calculatorKeys.map((row, index) => {
          return (
            <li className='calc-body-row' key={`row-${index}`} aria-label='calculator-row'>
              <ul >
                {
                  row.map((calcKey) => {
                    return (
                      <li key={calcKey} aria-label='calculator-keys' className='calc-body-key'>
                        <button onClick={(e) => {
                          handleOnCLick({ e })
                        }}>
                          {calcKey}
                        </button>
                      </li>
                    )
                  })
                }
              </ul>
            </li>
          )
        })
      }
    </ul>
  )
}
