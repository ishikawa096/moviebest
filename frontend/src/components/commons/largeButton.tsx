interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  title: string
}

const LargeButton = ({ onClick, title }: Props) => (
  <button
    onClick={onClick}
    title={title}
    className='bg-black p-3 w-64 border-2 border-black
               rounded-full flex justify-center text-white text-lg
               hover:bg-yellow-300 hover:text-black duration-150 ease-in-out'
  >
    <>{title}</>
  </button>
)

export default LargeButton
