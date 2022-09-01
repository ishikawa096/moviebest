import { CreateThemeParams } from 'interfaces/interface'
import { isEmptyObject } from 'lib/helpers'
import { useState } from 'react'
import SubmitButton from '../commons/submitButton'
import { validateTheme } from 'lib/validations'
import TitleInput from './titleInput'
import CapacitySelect from './capacitySelect'

const CAP_MIN = 2
const CAP_MAX = 10

type Props = {
  onSave: (formData: { theme: CreateThemeParams }) => void
  isSending: boolean
}

const ThemeForm = ({ onSave, isSending }: Props) => {
  const [formErrors, setFormErrors] = useState<{ [K in keyof CreateThemeParams]?: string }>({})

  const defaultsTheme = {
    title: '',
    capacity: 5,
  }
  const [theme, setTheme] = useState<CreateThemeParams>({ ...defaultsTheme })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { target } = e
    const { name } = target
    const value = target.value
    setTheme({ ...theme, [name]: value })
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const errors = validateTheme(theme)
    setFormErrors(errors)
    if (isEmptyObject(errors)) {
      const formData = { theme }
      onSave(formData)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <form name='listForm' className=' rounded-2xl w-full min-w-max sm:max-w-4xl overflow-hidden bg-white p-10 items-center text-gray-700'>
        <div className='mb-8'>
          <div className='w-full border-orange-500 border-l-8 text-lg tracking-wide p-3'>
            <label htmlFor='titleInput'>お題を入力</label>
          </div>
          <TitleInput theme={theme} onChange={handleInputChange} formError={formErrors.title} />
        </div>
        <div className='FormItem'>
          <div className='w-full border-orange-500 border-l-8 text-lg tracking-wide p-3'>選べる作品の数を設定（最大10）</div>
          <div className='p-4 px-10 items-center'>
            <label htmlFor='themeCapacity'>
              <strong>作品数</strong>
            </label>
            <CapacitySelect theme={theme} capMin={CAP_MIN} capMax={CAP_MAX} onChange={handleInputChange} formError={formErrors.capacity} />
          </div>
        </div>
        <div className='p-4 px-10 items-center text-center'>
          <SubmitButton onClick={handleSubmit} disabled={theme.title ? false : true} isSending={isSending} title='作成' />
          <span className='block mt-4 text-sm'>作品を選ぶ画面に移ります</span>
        </div>
      </form>
    </div>
  )
}

export default ThemeForm
