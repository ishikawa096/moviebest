import { toast, Flip } from 'react-toastify'

const defaults = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Flip,
  theme: 'colored',
}

export const toastSuccess = (message: string) => {
  toast.success(message, Object.assign(defaults))
}

export const toastInfo = (message: string) => {
  toast.info(message, Object.assign(defaults))
}

export const toastWarn = (message: string) => {
  toast.warn(message, Object.assign(defaults))
}

export const toastError = (message: string) => {
  toast.error(message, Object.assign(defaults))
}
