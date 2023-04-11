import './App.css'
import { CalculatorKeys } from './component/calculatorKeys/CalculatorKeys'
import { ToggleButton } from './component/toggleButton/ToggleButton'
import { useSelector } from 'react-redux'
import { type RootState } from './store/store'
import { useState } from 'react'

function App (): JSX.Element {
  const [equation, setEquation] = useState<string>('')
  const theme = useSelector((state: RootState) => state.theme.value)

  return (
    <div className={`App theme-${theme}`}>
      <main className={`main theme-${theme}`}>
        <div className='top-calc'>
          <h1>calc</h1>
          <ToggleButton/>
        </div>
        <div>
          <input className={`screen theme-${theme}`} value={equation} readOnly/>
          <CalculatorKeys equation={equation} setEquation={setEquation} />
        </div>
      </main>
    </div>
  )
}

export default App
