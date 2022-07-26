import { CreateThemeParams } from 'interfaces/interface'
import { isEmptyObject } from 'lib/helpers'
import { useThemeForm } from './useThemeForm'

type Props = {
  onSave: (formData: { theme: CreateThemeParams }) => void
}

const ThemeForm = ({ onSave }: Props) => {
  const { theme, formErrors, options, handleInputChange, handleSubmit } = useThemeForm(onSave)

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
              <select name='capacity' className='w-full' onChange={handleInputChange} value={theme.capacity}>
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
