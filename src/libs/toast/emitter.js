let events = []

const emitter = {

  on(event, callback) {
    if (!events[event]) events[event] = []
    events[event].push(callback)
  },

  emit(event, data) {
    if (!events[event] || !event) return
    events[event].forEach(callback => callback(data))
  },

  off() {
    events = []
  }
}

export { emitter }