import { toast } from '@/src/libs/toast'

export const Error = (result) => {

  const message = (result) => {

    if (result.error.graphQLErrors) {
      const [message] = result.error.graphQLErrors.map(e => (e.message))

      return message
    }

    else if (result.error.httpError)
      return result.error.httpError.statusText

    else return "TypeError: Failed to fetch"
  }

  const error = (error) => {
    toast(error)
  }

  if (result)
    return error(message(result))
}

export default Error
