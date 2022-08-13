interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  content: React.ReactNode
}

const FloatingButton = ({ onClick, content }: Props) => (
  <button
    onClick={onClick}
    className='fixed z-[90] bottom-10 right-8 bg-black
          w-40 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-lg
          hover:bg-orange-500 hover:text-black border-2 border-black duration-150 ease-in-out'
  >
    <>{content}</>
  </button>
)

export default FloatingButton
