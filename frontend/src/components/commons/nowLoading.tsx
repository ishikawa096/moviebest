import LoadingSpinner from './loadingSpinner'

const NowLoading = () => (
  <div className='flex items-center h-screen'>
    <div className='mr-auto ml-auto w-max-content text-center'>
      <LoadingSpinner />
    </div>
  </div>
)

export default NowLoading
