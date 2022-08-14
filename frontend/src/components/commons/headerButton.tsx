import { buttonColor } from 'components/layout/styles'
import { ButtonColor } from 'interfaces/interface'

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  text: string
  color: ButtonColor['color']
}

const HeaderButton = ({ onClick, text, color }: Props) => (
  <button
    type='button'
    className={`z-40 block w-40 md:w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white
                block focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap my-1 md:ml-3
                ${buttonColor({ color })}`}
    onClick={onClick}
  >
    {text}
  </button>
)

export default HeaderButton
