import Modal from 'react-modal'
import { ModalProps } from 'interfaces/interface'

const ConfirmModal = ({ showModal, title, description, confirmationText, cancellationText, handleConfirm, handleCancel }: ModalProps) => {
  if (typeof window !== 'undefined') {
    Modal.setAppElement('body')
  }

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      border: 'none',
    },
  }

  return (
    <Modal style={customStyles} isOpen={showModal}>
      <button
        type='button'
        onClick={handleCancel}
        className='absolute top-2.5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
        data-modal-toggle='popup-modal'
      >
        <svg aria-hidden='true' width='20' height='20' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          ></path>
        </svg>
        <span className='sr-only'>Close modal</span>
      </button>

      <div className='mt-3'>
        <svg aria-hidden='true' className='mx-auto mb-4 w-14 h-14 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
        </svg>
        <h3 className='text-lg text-center leading-6 font-medium text-gray-900' id='modal-title'>
          {title}
        </h3>
        <div className='mt-2 text-center'>
          <p className='text-sm text-gray-500'>{description}</p>
        </div>
      </div>
      <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
        <button
          type='button'
          className='w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white
            hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
          onClick={handleConfirm}
        >
          {confirmationText}
        </button>
        <button
          type='button'
          className='mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700
            hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
          onClick={handleCancel}
        >
          {cancellationText}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmModal
