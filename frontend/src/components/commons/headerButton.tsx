interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  text: string
  color: 'color' | 'white'
}

const buttonColor = (color: string) => {
  switch (color) {
    case 'white':
      return ' bg-white hover:bg-blue-600 focus:ring-blue-500 text-blue-600 hover:text-white border-2 border-blue-600 '
    default:
      return ' bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
  }
}

const Button = ({ onClick, text, color }: Props) => (
  <button
    type='button'
    className={`block w-40 md:w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white
                block focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap my-1 md:ml-3
                ${buttonColor(color)}`}
    onClick={onClick}
  >
    {text}
  </button>
)

export default Button
