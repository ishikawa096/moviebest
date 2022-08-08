interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  content: React.ReactNode
}

const FloatingButton = ({ onClick, content }: Props) => (
  <button
    onClick={onClick}
    title='同じお題で新規作成'
    className='fixed z-[90] bottom-10 right-8 bg-cyan-500
          w-40 h-20 rounded-full drop-shadow-sm flex justify-center items-center text-white text-lg
          hover:-translate-y-1 hover:scale-110 hover:bg-sky-400 duration-150 ease-in-out'
  >
    <>{content}</>
  </button>
)

export default FloatingButton
