import { useRef, useState } from 'react'
import { calculatorKeys, mathOperations } from '../constants'
import { calculate } from '../logic/calculate'

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

  const handleOnCLick = ({ e }: HandleProps): void => {
    e.preventDefault()
    const buttonValue: string = e.currentTarget.innerHTML

    switch (buttonValue) {
      case '=':
        console.log(calculate({ firstValue, equation, operation }))
        setEquation(() => calculate({ firstValue, equation, operation }))
        setFirstValue(() => '')
        break
      case 'RESET':
        setEquation(() => '')
        setFirstValue(() => '')
        operation.current = ''
        break
      case 'DEL':
        if (equation.length > 0) {
          const equationArray = equation.split('')
          equationArray.pop()
          setEquation(() => equationArray.join('') ?? '')
        } else {
          setEquation(() => '')
        }
        break

      default:
        break
    }

    if (mathOperations.includes(buttonValue) && equation !== '') {
      setEquation(() => buttonValue)
      if (operation.current === '') {
        setFirstValue(() => equation)
      }
      operation.current = buttonValue
    } else if (buttonValue !== '=') {
      setEquation((prev) => !mathOperations.includes(prev) ? prev + buttonValue : buttonValue)
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
