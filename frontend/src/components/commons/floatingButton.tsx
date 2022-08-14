interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  content: React.ReactNode
}

const FloatingButton = ({ onClick, content }: Props) => (
  <button
    onClick={onClick}
    className='fixed z-[90] bottom-10 right-8 bg-gray-800
          w-40 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-lg
          hover:bg-orange-500 duration-150 ease-in-out'
  >
    <>{content}</>
  </button>
)

export default FloatingButton
