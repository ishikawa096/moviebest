import { useState } from 'react'
import { isEmptyObject } from 'lib/helpers'
import { validateTheme } from 'lib/validates'
import { CreateThemeParams } from 'interfaces/interface'

const CAP_MIN = 2
const CAP_MAX = 10

export const useThemeForm = (onSave: (formData: { theme: CreateThemeParams }) => void) => {
  const [formErrors, setFormErrors] = useState<{} | { title: string }>({})

  const defaultsTheme = {
    title: '',
    capacity: 5,
  }
  const initialThemeState = { ...defaultsTheme }
  const [theme, setTheme] = useState<CreateThemeParams>(initialThemeState)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { target } = e
    const { name } = target
    const value = target.value
    setTheme({ ...theme, [name]: value })
  }

  const options = [...Array(CAP_MAX - CAP_MIN + 1)].map((_, i) => {
    return i + CAP_MIN
  })

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const errors = validateTheme(theme)
    setFormErrors(errors)
    if (isEmptyObject(errors)) {
      const formData = { theme }
      onSave(formData)
    }
  }

  return {
    theme,
    formErrors,
    options,
    handleInputChange,
    handleSubmit,
  }
}
