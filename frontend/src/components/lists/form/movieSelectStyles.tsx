import type { MovieSelectOption } from 'interfaces/interface'
import Image from 'next/image'
import { components, ControlProps, InputProps, StylesConfig, Theme, ValueContainerProps } from 'react-select'
import { posterUrl } from 'lib/tmdbHelpers'

const BLUR_IMAGE = '/assets/images/342x509.png'
const NO_IMAGE = '/assets/images/noimage.png'

export const FormatOptionLabel = ({ option, onError }: { option: MovieSelectOption; onError: (option: MovieSelectOption) => void }) => (
  <div className='flex items-center justify-center relative m-0 h-[195px] sm:h-[277px] lg:h-[374px]'>
    <Image
      src={option.label === formatCreateLabel(option.value) || !option.posterPath ? NO_IMAGE : posterUrl(option.posterPath, 'w342')}
      alt={option.label}
      layout='fill'
      objectFit='cover'
      placeholder='blur'
      blurDataURL={BLUR_IMAGE}
      onError={() => onError(option)}
    />
    <div className='absolute p-2 md:p-5 text-center whitespace-normal text-white font-extrabold text-shadow'>{option.label}</div>
  </div>
)

export const placeholder = (
  <div className='flex relative items-center justify-center p-0 m-0 h-[195px] sm:h-[277px] lg:h-[374px]'>
    <div>
      <Image src={BLUR_IMAGE} alt='ここに映画のタイトルを入力' width={342} height={509} objectFit='cover' placeholder='blur' blurDataURL={BLUR_IMAGE} />
    </div>
    <div className='absolute z-10 text-center leading-normal'>
      ここに
      <br />
      映画の
      <br />
      タイトルを
      <br />
      入力
    </div>
  </div>
)

export const formatCreateLabel = (inputValue: string) => `"${inputValue}"を選択`

export const Control = ({ children, ...props }: ControlProps) => (
  <components.Control {...props} className='text-xs md:text-sm lg:text-base '>
    {children}
  </components.Control>
)

export const Input = (props: InputProps) => (
  <components.Input
    {...props}
    inputClassName='h-[195px] sm:h-[277px] lg:h-[374px] w-[130px] sm:w-[185px] lg:w-[250px] outline-none border-none shadow-none text-center focus:ring-transparent focus:z-10'
  />
)

export const ValueContainer = ({ children, ...props }: ValueContainerProps) => (
  <components.ValueContainer {...props} className='w-[130px] sm:w-[185px] lg:w-[250px]'>
    {children}
  </components.ValueContainer>
)

export const movieFormStyles: StylesConfig = {
  control: (styles, { isFocused }) => {
    return {
      ...styles,
      borderWidth: 1,
      borderRadius: '0.25rem',
      borderStyle: 'solid',
      borderColor: 'rgb(209 213 219)',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      padding: isFocused ? 6 : 3,
    }
  },
  indicatorsContainer: (styles) => ({ ...styles, display: 'none' }),
  menu: (styles) => ({ ...styles, zIndex: 300 }),
  option: (styles) => {
    return {
      ...styles,
      padding: 5,
      zIndex: 100,
    }
  },
  input: (styles) => ({ ...styles, fontSize: '1.25rem' }),
  valueContainer: (styles) => ({
    ...styles,
    padding: 0,
    objectFit: 'fill',
  }),
}

export const formTheme = (theme: Theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#0ea5e9',
    primary75: '#38bdf8',
    primary50: '#7dd3fc',
    primary25: '#bae6fd',
  },
})
