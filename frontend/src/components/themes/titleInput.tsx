import FormError from 'components/formError'
import { CreateThemeParams } from 'interfaces/interface'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  theme: CreateThemeParams
  formError?: string
}

const TitleInput = ({ onChange, theme, formError }: Props) => (
  <>
    <div className='relative z-0 p-4'>
      <input
        type='text'
        name='title'
        id='titleInput'
        onChange={onChange}
        value={theme.title}
        className={`${
          formError ? 'border-red-500' : 'border-gray-300'
        } block py-2.5 px-0 w-full text-2xl sm:text-3xl lg:text-4xl text-gray-900 bg-transparent border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 focus:border-sky-500 peer placeholder-gray-400`}
        placeholder='ここにお題を入力'
      />
      {formError ? <FormError error={formError} /> : undefined}
    </div>
  </>
)

export default TitleInput
