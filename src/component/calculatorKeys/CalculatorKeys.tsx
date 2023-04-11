import { useState } from 'react'
import { calculatorKeys, mathOperations } from '../../constants'
import { calculate } from '../../logic/calculate'
import './styles.css'
import { useSelector } from 'react-redux'
import { type RootState } from '../../store/store'

interface Props {
  equation: string
  setEquation: React.Dispatch<React.SetStateAction<string>>
}

interface HandleProps {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
}

export const CalculatorKeys = ({ equation, setEquation }: Props): JSX.Element => {
  const [firstValue, setFirstValue] = useState('')
  const [operation, setOperation] = useState('')
  const [secondValue, setSecondValue] = useState('')
  const theme = useSelector((state: RootState) => state.theme.value)

  const handleOnCLick = ({ e }: HandleProps): void => {
    e.preventDefault()
    const buttonValue: string = e.currentTarget.innerHTML

    switch (buttonValue) {
      case '=':
        const result = calculate({ firstValue, secondValue, operation })
        setEquation(() => result)
        setFirstValue(() => result)
        setSecondValue(() => '')
        setOperation(() => '')
        return

      case 'RESET':
        setEquation(() => '')
        setFirstValue(() => '')
        setOperation(() => '')
        return

      case 'DEL':
        if (operation !== '' && secondValue === '') { // Deletes math operand
          setOperation(() => '')
          setEquation(() => '')
        } else { // Deletes any number
          const equationArray = equation.split('')
          equationArray.pop()
          setEquation(() => equationArray.join('') ?? '')
          setSecondValue(equationArray.join('') ?? '')
        }
        return
    }

    if (equation === 'SYNTAX ERROR' || equation === 'Infinity') { // Resets values if user clicks a button
      setFirstValue(() => buttonValue)
      setEquation(() => buttonValue)
      return
    }

    if (
      (firstValue === '' && buttonValue === '-') || // Allows to write negative numbers
        (!mathOperations.includes(buttonValue) && operation === '')
    ) {
      setFirstValue((prev) => prev + buttonValue)
      setEquation((prev) => prev + buttonValue)
    } else if (mathOperations.includes(buttonValue) && operation === '') {
      setOperation(() => buttonValue)
      setEquation(() => buttonValue)
    } else {
      if (secondValue === '') { // Removes math operation before right-hand number
        setSecondValue(() => buttonValue)
        setEquation(() => buttonValue)
      } else {
        setSecondValue((prev) => prev + buttonValue)
        setEquation((prev) => prev + buttonValue)
      }
    }
  }

  return (
    <ul className={`calc-body theme-${theme}`}>
      {
        calculatorKeys.map((row, index) => {
          return (
            <li className={`calc-body-row theme-${theme}`} key={`row-${index}`} aria-label='calculator-row'>
              <ul >
                {
                  row.map((calcKey) => {
                    return (
                      <li key={calcKey} aria-label='calculator-keys' className={`calc-body-key theme-${theme}`}>
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
