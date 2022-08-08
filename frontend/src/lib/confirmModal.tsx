import Modal from 'react-modal'
import { ModalProps } from 'interfaces/interface'
import CloseButton from 'components/CloseButton'

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

      <CloseButton onClick={handleCancel} srOnly='close modal' />

      <div className='mt-3'>
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
