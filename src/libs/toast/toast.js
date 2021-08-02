import { emitter } from './emitter'

const toast = (message) => {

  emitter.emit('open', { type: 'add', message: message })
}

export { toast }