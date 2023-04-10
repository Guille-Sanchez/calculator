// import { useState } from 'react'
import './styles.css'
import { type RootState } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../../themes/themesSlice'

export function ToggleButton (): JSX.Element {
  const theme = useSelector((state: RootState) => state.theme.value)
  const dispatch = useDispatch()
  // const [selectedOption, setSelectedOption] = useState('1')

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // setSelectedOption(event.target.value)
    dispatch(update(event.target.value))
  }

  const themes = ['1', '2', '3'] as const

  return (
    <div className='toggle-container'>
      <p>THEME</p>
      <div className='toggle'>
        {
          themes.map((item) => {
            return (
          <div key={`theme-${item}`}>
            <p className='theme-label'>{item}</p>
            <label className={`container theme-${theme}`}>
              <input
                type="radio"
                value={item}
                // checked={selectedOption === '1'}
                checked={theme === item}
                onChange={handleOptionChange}
              ></input>
              <span className={`checkmark theme-${theme}`}/>
            </label>
          </div>
            )
          })
        }
      </div>
    </div>
  )
}
