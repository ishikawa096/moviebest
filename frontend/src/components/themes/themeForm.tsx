import { CreateThemeParams } from 'interfaces/interface'
import { isEmptyObject } from 'lib/helpers'
import { useState } from 'react'
import SubmitButton from '../commons/submitButton'
import { validateTheme } from 'lib/validates'
import TitleForm from './titleForm'
import CapacitySelect from './capacitySelect'

const CAP_MIN = 2
const CAP_MAX = 10

type Props = {
  onSave: (formData: { theme: CreateThemeParams }) => void
  isError: boolean
}

const ThemeForm = ({ onSave, isError }: Props) => {
  const [formErrors, setFormErrors] = useState<{ [K in keyof CreateThemeParams]?: string }>({})
  const [isSending, setIsSending] = useState<boolean>(false)

  const defaultsTheme = {
    title: '',
    capacity: 5,
  }
  const [theme, setTheme] = useState<CreateThemeParams>({ ...defaultsTheme })

  const capacities = [...Array(CAP_MAX - CAP_MIN + 1)].map((_, i) => {
    return i + CAP_MIN
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { target } = e
    const { name } = target
    const value = target.value
    setTheme({ ...theme, [name]: value })
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const errors = validateTheme(theme)
    setFormErrors(errors)
    if (isEmptyObject(errors)) {
      const formData = { theme }
      onSave(formData)
      setIsSending(true)
    }
  }

  return (
    <>
      <div className='w-full text-2xl lg:text-4xl text-center py-10 tracking-widest underline decoration-double decoration-4 underline-offset-2 decoration-sky-200'>
        <h1>新しいお題をつくる</h1>
      </div>
      <form onSubmit={handleSubmit} name='listForm' className='border-2 rounded-2xl w-full min-w-max sm:max-w-4xl overflow-hidden'>
        <div className='FormItem'>
          <div className='w-full bg-gray-200 text-lg tracking-wide p-3'>
            <label htmlFor='themeTitleForm'>お題を入力</label>
          </div>
          <TitleForm theme={theme} onChange={handleInputChange} formErrors={formErrors} />
        </div>
        <div className='FormItem'>
          <div className='w-full bg-gray-200 text-lg tracking-wide p-3'>選べる作品の数を設定（最大10）</div>
          <div className='p-4 px-10 items-center'>
            <label htmlFor='themeCapacity'>
              <strong>作品数</strong>
            </label>
            <CapacitySelect theme={theme} capacities={capacities} onChange={handleInputChange} formErrors={formErrors} />
          </div>
        </div>
        <div className='w-full bg-gray-200 text-lg tracking-wide p-3'>作成！</div>
        <div className='p-4 px-10 items-center text-center'>
          <SubmitButton onClick={handleSubmit} disabled={theme.title ? false : true} isSending={isError ? false : isSending} title='作成' />
          <span className='block mt-4 text-sm'>作品を選ぶ画面に移ります</span>
        </div>
      </form>
    </>
  )
}

export default ThemeForm
