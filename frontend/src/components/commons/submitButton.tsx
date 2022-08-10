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
        className='w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white
            hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-80 sm:text-lg disabled:bg-red-200'
      >
        {title}
      </button>
    )}
  </>
)

export default SubmitButton
