import { buttonColor, ButtonColor } from 'lib/colors'
import LoadingButton from './loadingButton'

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  disabled: boolean
  isSending: boolean
  text: string
  color: ButtonColor
}

const SignInButton = ({ onClick, disabled, isSending, text, color }: Props) => (
  <>
    {isSending ? (
      <LoadingButton />
    ) : (
      <button
        type='button'
        onClick={onClick}
        disabled={disabled}
        className={`focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 whitespace-nowrap
        ${buttonColor(color)}`}
      >
        {text}
      </button>
    )}
  </>
)

export default SignInButton
