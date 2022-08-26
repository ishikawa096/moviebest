import FormError from 'components/formError'
import { CreateThemeParams } from 'interfaces/interface'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  theme: CreateThemeParams
  capMin: number
  capMax: number
  formError?: string
}

const CapacitySelect = ({ onChange, theme, capMin, capMax, formError }: Props) => {
  const capacities = [...Array(capMax - capMin + 1)].map((_, i) => {
    return i + capMin
  })

  return (
    <>
      <select
        name='capacity'
        onChange={onChange}
        value={theme.capacity}
        className={`${
          formError ? 'border-2 border-red-500' : 'border border-gray-300'
        } text-xl sm:text-2xl lg:text-3xl bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5`}
      >
        {capacities.map((n) => (
          <option value={n} key={'cap-option-' + n}>
            {n}
          </option>
        ))}
      </select>
      {formError ? <FormError error={formError} /> : undefined}
    </>
  )
}

export default CapacitySelect
