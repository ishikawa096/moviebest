import { useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Theme } from 'interfaces/interface'
import { isEmptyObject } from 'lib/helpers'
import { validateTheme } from 'lib/validates'

type Props = {
  onSave: (formData: { theme: Theme }) => void
}

const ThemeForm = ({ onSave }: Props) => {
  const router = useRouter()

  const [formErrors, setFormErrors] = useState<{} | { title: string }>({})

  const defaultsTheme = {
    title: '',
    capacity: 5,
  }
  const initialThemeState = { ...defaultsTheme }
  const [theme, setTheme] = useState<{title: string, capacity: number}>(initialThemeState)

  useEffect(() => {
    setTheme(initialThemeState)
  }, [])

  const handleInputChange = (e: { target: HTMLInputElement | HTMLSelectElement }) => {
    const { target } = e
    const { name } = target
    const value = target.value
    setTheme({ ...theme, [name]: value })
  }

  const capMin = 2
  const capMax = 20
  const options = [...Array(capMax - capMin + 1)].map((_, i) => {
    return i + capMin
  })

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      return null
    }
    return (
      <div className='errors'>
        <ul>
          {Object.values(formErrors).map((formError, i) => (
            <li key={i}>{formError}</li>
          ))}
        </ul>
      </div>
    )
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const errors = validateTheme(theme)
    setFormErrors(errors)
    if (isEmptyObject(errors)) {
      const formData = { theme }
      onSave(formData)
    }
  }

  return (
    <>
      <form className='listForm' onSubmit={handleSubmit} name='listForm'>
        <div className='listFormInner'>
          <div className='listFormItem'>
            <>
              {renderErrors()}
              <label htmlFor='themeTitle'>
                <strong>お題:</strong>
                <input type='text' name='title' className='w-full' onChange={handleInputChange} value={theme.title} placeholder='お題を入力' autoFocus />
              </label>
            </>
          </div>
          <div className='listFormItem'>
            <label htmlFor='themeTitle'>
              <strong>作品数</strong>
              <select name='capacity' className='w-full' onChange={handleInputChange} value={theme.capacity} >
                {options.map((n) => (
                  <option value={n} key={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className='form-actions'>
          <button type='submit' color='blue'>
            作成
          </button>
        </div>
      </form>
    </>
  )
}

export default ThemeForm
