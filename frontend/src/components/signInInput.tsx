import FormError from "./formError"

interface Props {
  value: string
  label: string
  name: string
  type: HTMLInputElement['type']
  autoComplete: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

const SignInInput = ({ value, label, name, type, autoComplete, onChange, error }: Props) => (
  <div className='relative z-0 mb-6 w-full group'>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      className={`${error ? 'border-red-300' : 'border-gray-300' } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-sky-500 peer`}
      placeholder=' '
      required
    />
    <label
      htmlFor={name}
      className='left-0 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7'
    >
      {label}
    </label>
    {error ? <FormError error={label + error} /> : undefined }
  </div>
)

export default SignInInput
