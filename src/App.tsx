import { useState } from 'react'
import './App.css'
import { CalculatorKeys } from './component/CalculatorKeys'

function App (): JSX.Element {
  const [equation, setEquation] = useState<string>('')

  return (
    <div className="App">
      <main>
        <div>
          <h1>calc</h1>
          <div>
            <p>Theme</p>
            <div>
              <div>
                <label htmlFor="theme1">1</label>
                <input type="checkbox" />
              </div>
              <div>
                <label htmlFor="theme2">2</label>
                <input type="checkbox" />
              </div>
              <div>
                <label htmlFor="theme3">3</label>
                <input type="checkbox" />
              </div>
            </div>
          </div>
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
