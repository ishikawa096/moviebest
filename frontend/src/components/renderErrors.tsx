const RenderErrors = ({ error }: { error: string }) => {
  return <div className='w-full p-2 text-sm text-red-500'>❗️{error}</div>
}

export default RenderErrors
