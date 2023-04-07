import { useState } from 'react'
import './styles.css'

export function ToggleButton (): JSX.Element {
  const [selectedOption, setSelectedOption] = useState('1')

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedOption(event.target.value)
  }

  return (
    <div className='toggle-container'>
      <p>THEME</p>
      <div className='toggle'>
        <div>
          <p className='theme-label'>1</p>
          <label className="container">
            <input
              type="radio"
              value="1"
              checked={selectedOption === '1'}
              onChange={handleOptionChange}
            ></input>
            <span className="checkmark"/>
          </label>
        </div>

        <div>
          <p className='theme-label'>2</p>
          <label className="container">
            <input
              type="radio"
              value="2"
              checked={selectedOption === '2'}
              onChange={handleOptionChange}
            />
            <span className="checkmark"/>
          </label>
        </div>

        <div>
          <p className='theme-label'>3</p>
          <label className="container">
            <input
              type="radio"
              value="3"
              checked={selectedOption === '3'}
              onChange={handleOptionChange}
            />
            <span className="checkmark"/>
          </label>
        </div>

      </div>
    </div>
  )
}
