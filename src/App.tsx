import { useRef, useState } from 'react'
import './App.css'
import { calculatorKeys, mathOperations } from './constants'

interface Props {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
}

function App (): JSX.Element {
  const [equation, setEquation] = useState<string>('')
  const [firstValue, setFirstValue] = useState<number>(0)
  const operation = useRef('')

  const handleOnCLick = ({ e }: Props): void => {
    e.preventDefault()
    const buttonValue: string = e.currentTarget.innerHTML

    if (mathOperations.includes(buttonValue)) {
      setFirstValue(() => Number(equation))
      operation.current = buttonValue
      setEquation(() => buttonValue)
    } else if (buttonValue === '=') {
      switch (operation.current) {
        case '+':
          setEquation(() => (firstValue + Number(equation)).toString())
          setFirstValue(() => (firstValue + Number(equation)))
          operation.current = ''
          break
        case '-':
          setEquation(() => (firstValue - Number(equation)).toString())
          setFirstValue(() => (firstValue + Number(equation)))
          operation.current = ''
          break
        case '*':
          setEquation(() => (firstValue * Number(equation)).toString())
          setFirstValue(() => (firstValue + Number(equation)))
          operation.current = ''
          break
        case '/':
          setEquation(() => (firstValue / Number(equation)).toString())
          setFirstValue(() => (firstValue + Number(equation)))
          operation.current = ''
          break

        default:
          console.log('An error has ocurred')
      }
    } else if (buttonValue === 'RESET') {
      setEquation(() => '')
      setFirstValue(() => 0)
      operation.current = ''
    } else if (buttonValue === 'DEL') {
      if (equation.length > 0) {
        const equationArray = equation.split('')
        equationArray.pop()
        setEquation(() => equationArray.join('') ?? '')
      } else {
        setEquation(() => '')
      }
    } else {
      setEquation((prev) => !mathOperations.includes(prev) ? prev + buttonValue : buttonValue)
    }
  }

  return (
    <div className="App">
      <h1>Calculator</h1>
      <div>
        <input value={equation} readOnly/>
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
            })}
        </ul>
      </div>
    </div>
  )
}

export default App
