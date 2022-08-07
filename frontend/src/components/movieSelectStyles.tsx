import type { MovieSelectOption } from 'interfaces/interface'
import Image from 'next/image'
import { components, ControlProps, InputProps, StylesConfig, Theme, ValueContainerProps } from 'react-select'
import { posterUrl } from 'lib/tmdbHelpers'

export const FormatOptionLabel = ({ option, onError }: { option: MovieSelectOption; onError: (option: MovieSelectOption) => void }) => (
  <div className='flex items-center justify-center relative m-0 h-[193px] sm:h-[275px] lg:h-[372px]'>
    <Image
      src={option.label === formatCreateLabel(option.value) || !option.posterPath ? '/342x509.png' : posterUrl(option.posterPath, 'w342')}
      alt={option.label}
      layout='fill'
      objectFit='cover'
      placeholder='blur'
      blurDataURL='/342x509.png'
      onError={() => onError(option)}
    />
    <div className='absolute p-2 md:p-5 text-center whitespace-normal text-white font-extrabold text-shadow'>{option.label}</div>
  </div>
)

export const placeholder = (
  <div className='flex relative items-center justify-center p-0 m-0 h-[195px] sm:h-[277px] lg:h-[374px]'>
    <div>
      <Image src='/342x509.png' alt='ここに映画のタイトルを入力' width={342} height={509} objectFit='cover' placeholder='blur' blurDataURL='/342x509.png' />
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
  <components.Control {...props} className='text-xs lg:text-base '>
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
      borderWidth: 4,
      borderStyle: 'dashed',
      boxShadow: 'inherit',
      padding: isFocused ? 10 : 3,
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
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary: '#1F2937',
  },
})
