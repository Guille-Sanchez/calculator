import { useState } from 'react'
import './App.css'
import { CalculatorKeys } from './component/calculatorKeys/CalculatorKeys'
import { ToggleButton } from './component/toggleButton/ToggleButton'

function App (): JSX.Element {
  const [equation, setEquation] = useState<string>('')

  return (
    <div className="App">
      <main>
        <div className='top-calc'>
          <h1>calc</h1>
          <ToggleButton/>
        </div>
        <div className='keys'>
          <input className='screen' value={equation} readOnly/>
          <CalculatorKeys equation={equation} setEquation={setEquation} />
        </div>
      </main>
    </div>
  )
}

export default App
