import { emitter } from './emitter'

export const dispatcher = ({ dispatch }) => {

  emitter.on('open', (toast) => {
    dispatch(toast)
  })

  emitter.on('close', () => dispatch({ type: 'clear' }))
}