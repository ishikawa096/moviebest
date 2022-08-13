import LoadingButton from './loadingButton'

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  disabled: boolean
  isSending: boolean
  title: string
}

const SubmitButton = ({ onClick, disabled, isSending, title }: Props) => (
  <>
    {isSending ? (
      <LoadingButton />
    ) : (
      <button
        type='submit'
        onClick={onClick}
        disabled={disabled}
        className='w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-sky-500 text-base font-medium text-white
            hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-80 sm:text-lg disabled:bg-sky-200 whitespace-nowrap'
      >
        {title}
      </button>
    )}
  </>
)

export default SubmitButton
