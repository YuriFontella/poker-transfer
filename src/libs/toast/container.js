import Toast from '@/src/components/libs/toast'

import { reducer } from './reducer'

import { emitter } from './emitter'

import { dispatcher } from './dispatcher'

import { Fragment, useEffect } from 'react'

const ToastContainer = () => {

  const { toasts, dispatch } = reducer()

  useEffect(() => {
    dispatcher({ dispatch })

    if (toasts.length) {
      setTimeout(() => {
        emitter.emit('close')
      }, 4000)
    }

    return () => {
      emitter.off()
    }

  }, [dispatch, toasts])

  return (
    <Fragment>
      {toasts.map((r, i) => (
        <Toast key={i} message={r.message} />
      ))}
    </Fragment>
  )
}

export default ToastContainer