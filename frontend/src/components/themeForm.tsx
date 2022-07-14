import { useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'
import client from 'lib/api/client'
import { List, Theme } from 'interfaces/interface'
import { render } from '@testing-library/react'

type Props = {
  onSave: (formData: { theme: { title: string; capacity: number } }) => void
}

const ThemeForm = ({ onSave }: Props) => {
  const router = useRouter()

  const defaultsTheme = {
    title: '',
    capacity: 5,
  }
  const initialThemeState = { ...defaultsTheme }
  const [theme, setTheme] = useState(initialThemeState)

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
  const options =
    [...Array(capMax - capMin + 1)].map((_, i) => {
      return i + capMin
    })

  const renderErrors = (errors: { comment?: string }) => {
    const errorMessages = Object.values(errors).join('')
    // error(errorMessages)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const formData = { theme }
    // const errors = validateList(list)
    // if (!isEmptyObject(errors)) {
    //   renderErrors(errors)
    // } else {
    onSave(formData)
    setTheme(initialThemeState)
    // }
  }

  // if (id && !list.id) return <listNotFound />

  return (
    <>
      <form className='listForm' onSubmit={handleSubmit} name='listForm'>
        <div className='listFormInner'>
          <div className='listFormItem'>
            <label htmlFor='themeTitle'>
              <strong>お題:</strong>
              <input type='text' id='themeTitle' name='title' className='ThemeInput w-full' onChange={handleInputChange} value={theme.title} placeholder='お題を入力' required />
            </label>
          </div>
          <div className='listFormItem'>
            <label htmlFor='themeTitle'>
              <strong>作品数</strong>
              <select id='themeCapacity' name='capacity' className='ThemeInput w-full' onChange={handleInputChange} value={theme.capacity} required >
                {options.map((n) => (
                  <option value={n} key={n}>{n}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className='form-actions'>
          <button type='submit' color='blue'>
            このお題を使う
          </button>
        </div>
      </form>
    </>
  )
}

export default ThemeForm
