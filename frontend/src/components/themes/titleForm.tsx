import RenderErrors from 'components/renderErrors'
import { CreateThemeParams } from 'interfaces/interface'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  theme: CreateThemeParams
  formErrors: { [K in keyof CreateThemeParams]?: string }
}

const TitleForm = ({ onChange, theme, formErrors }: Props) => (
  <>
    <div className='relative z-0 p-4'>
      <input
        type='text'
        id='themeTitleForm'
        name='title'
        onChange={onChange}
        value={theme.title}
        className={`${
          formErrors.title ? 'border-red-500' : 'border-gray-300'
        } block py-2.5 px-0 w-full text-2xl sm:text-3xl lg:text-4xl text-gray-900 bg-transparent border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 focus:border-sky-500 peer placeholder-gray-400`}
        placeholder='ここにお題を入力'
      />
      {formErrors.title ? <RenderErrors error={formErrors.title} /> : undefined}
    </div>
  </>
)

export default TitleForm
