import LoadingButton from './loadingButton'

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  disabled: boolean
  isSending: boolean
  title: string
  color?: string
}

const SubmitButton = ({ onClick, disabled, isSending, title, color }: Props) => (
  <>
    {isSending ? (
      <LoadingButton />
    ) : (
      <button
        type='submit'
        onClick={onClick}
        disabled={disabled}
        className={`${
          color === 'red' ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' : 'bg-sky-500 hover:bg-sky-600 focus:ring-sky-500'
        } w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white
            focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-80 sm:text-lg disabled:bg-gray-200 whitespace-nowrap`}
      >
        {title}
      </button>
    )}
  </>
)

export default SubmitButton
