interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  srOnly: string
}

const CloseButton = ({ onClick, srOnly }: Props) => (
  <button
    type='button'
    onClick={onClick}
    className='absolute z-10 top-0.5 right-0.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-0.5 ml-auto inline-flex items-center'
  >
    <svg aria-hidden='true' width='20' height='20' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
        clipRule='evenodd'
      ></path>
    </svg>
    <span className='sr-only'>{srOnly}</span>
  </button>
)

export default CloseButton
