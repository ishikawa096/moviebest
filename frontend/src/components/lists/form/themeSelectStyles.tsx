import { components, ControlProps, InputProps, StylesConfig} from 'react-select'

export const Control = ({ children, ...props }: ControlProps) => (
  <components.Control {...props} className='text-lg md:text-xl lg:text-2xl'>
    {children}
  </components.Control>
)

export const Input = (props: InputProps) => (
  <components.Input
    {...props}
    inputClassName='outline-none border-none shadow-none text-center focus:ring-transparent focus:z-10'
  />
)

export const styles: StylesConfig = {
  input: (styles) => ({ ...styles, fontSize: '2rem' }),
  menu: (styles) => ({ ...styles, zIndex: 300 }),
}
