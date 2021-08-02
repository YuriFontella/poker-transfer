import { useReducer } from 'react'

const mutations = (toasts, data) => {

  switch (data.type) {
    case 'add':
      return [data]

    case 'clear':
      return []

    default:
      throw new Error()
  }
}

export const reducer = () => {
  const [toasts, dispatch] = useReducer(mutations, [])

  return {
    toasts, dispatch
  }
}
