interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  title: string
}

const LargeButton = ({ onClick, title }: Props) => (
  <button
    onClick={onClick}
    title={title}
    className='bg-gray-800 p-4 w-64
               rounded-full flex justify-center text-white text-lg
               hover:bg-sky-500 duration-150 ease-in-out'
  >
    <>{title}</>
  </button>
)

export default LargeButton
