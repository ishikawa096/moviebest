import Modal from 'react-modal'
import { ModalProps } from 'interfaces/interface'
import CloseButton from 'components/commons/closeButton'
import { MouseEventHandler } from 'react'

const ModalButton = ({ onClick, text, isColored }: { onClick: MouseEventHandler; text: string; isColored: boolean }) => (
  <button
    type='button'
    className={`${
      isColored ? 'text-white border-transparent bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'text-gray-700 border-gray-300 bg-white hover:bg-gray-300 focus:ring-sky-500'
    } mt-3 w-full inline-flex justify-center rounded-lg border shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
    onClick={onClick}
  >
    {text}
  </button>
)

const ImportantModal = ({ showModal, title, description, confirmationText, cancellationText, handleConfirm, handleCancel }: ModalProps) => {
  if (typeof window !== 'undefined') {
    Modal.setAppElement('body')
  }

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 100,
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
      <CloseButton onClick={handleCancel} srOnly='閉じる' />
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
        <ModalButton onClick={handleConfirm} text={confirmationText} isColored={true} />
        <ModalButton onClick={handleCancel} text={cancellationText} isColored={false} />
      </div>
    </Modal>
  )
}

export default ImportantModal
