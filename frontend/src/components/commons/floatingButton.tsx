interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  content: React.ReactNode
}

const FloatingButton = ({ onClick, content }: Props) => (
  <button
    onClick={onClick}
    className='fixed z-[90] bottom-3 md:bottom-8 right-3 md:right-8 bg-sky-500 text-3xl md:text-4xl
          w-16 h-16 md:w-24 md:h-24 rounded-full drop-shadow-lg flex justify-center items-center text-white
          hover:bg-sky-400 duration-150 ease-in-out'
  >
    <>{content}</>
  </button>
)

export default FloatingButton
