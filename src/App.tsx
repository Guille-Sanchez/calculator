import { useState } from 'react'
import './App.css'
import { CalculatorKeys } from './component/CalculatorKeys'

function App (): JSX.Element {
  const [equation, setEquation] = useState<string>('')

  return (
    <div className="App">
      <h1>Calculator</h1>
      <div>
        <input value={equation} readOnly/>
        <CalculatorKeys equation={equation} setEquation={setEquation} />
      </div>
    </div>
  )
}

export default App
