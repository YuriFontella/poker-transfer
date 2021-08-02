import { SpeakerphoneIcon } from '@heroicons/react/solid'

const Toast = ({ message }) => {

  return (
    <div className="fixed flex items-center justify-center w-full bottom-2 z-50">
      <div className="flex space-x-4 text-white text-sm px-6 py-3 rounded shadow-xl bg-gradient-to-r from-blue-700 to-blue-500">
        <span>
          <SpeakerphoneIcon className="h-5 w-5" />
        </span>
        <span>
          <p className="font-medium">{message}</p>
        </span>
      </div>
    </div>
  )
}

export default Toast
