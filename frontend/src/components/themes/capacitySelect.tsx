import RenderErrors from 'components/renderErrors'
import { CreateThemeParams } from 'interfaces/interface'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  theme: CreateThemeParams
  capacities: Array<number>
  formErrors: { [K in keyof CreateThemeParams]?: string }
}

const CapacitySelect = ({ onChange, theme, capacities, formErrors }: Props) => (
  <>
    <select
      name='capacity'
      onChange={onChange}
      value={theme.capacity}
      className={`${
        formErrors.capacity ? 'border-2 border-red-500' : 'border border-gray-300'
      } text-xl sm:text-2xl lg:text-3xl bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
    >
      {capacities.map((n) => (
        <option value={n} key={n}>
          {n}
        </option>
      ))}
    </select>
    {formErrors.capacity ? <RenderErrors error={formErrors.capacity} /> : undefined}
  </>
)

export default CapacitySelect
