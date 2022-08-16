import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

const RenderErrors = ({ error }: { error: string }) => {
  return (
    <div className='w-full p-2 text-sm text-red-500 motion-safe:animate-fade'>
      <FontAwesomeIcon icon={faTriangleExclamation} className='px-1' />
      {error}
    </div>
  )
}

export default RenderErrors
