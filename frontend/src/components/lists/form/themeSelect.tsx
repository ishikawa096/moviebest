import { Theme } from 'interfaces/interface'
import Select from 'react-select'
import { formTheme } from './movieSelectStyles'
import { styles, Input, Control } from './themeSelectStyles'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  themes: Array<Theme>
  theme?: Theme
}

const ThemeSelect = ({ onChange, themes, theme }: Props) => {
  const options = () => {
    const options = themes.map((t: Theme) => ({
      label: t.title,
      value: t,
    }))
    return options
  }

  return (
    <div className='w-full mb-1 p-3 md:p-10'>
      <Select
        defaultValue={theme ? { label: theme.title, value: theme } : { label: 'お題を選択', value: {} }}
        onChange={(newValue: any) => onChange(newValue)}
        options={options()}
        components={{ Input, Control }}
        styles={styles}
        theme={formTheme}
      />
    </div>
  )
}
export default ThemeSelect
