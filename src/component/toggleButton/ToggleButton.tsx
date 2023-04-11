import './styles.css'
import { type RootState } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../../themes/themesSlice'
import { useEffect } from 'react'

export function ToggleButton (): JSX.Element {
  const theme = useSelector((state: RootState) => state.theme.value)
  const dispatch = useDispatch()

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(update(event.target.value))
    window.localStorage.setItem('theme', event.target.value)
  }

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      const theme = window.localStorage.getItem('theme') ?? '1'
      dispatch(update(theme))
    }

    return () => {
      subscribed = false
    }
  }, [])

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
