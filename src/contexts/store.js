import mutations from '@/src/libs/store/mutations'

import { createContext, useContext, useReducer } from 'react'

export const Store = createContext()

const StoreProvider = ({ children }) => {

  const [state, dispatch] = useReducer(mutations, {})

  return (
    <Store.Provider value={{ state, dispatch }}>
      {children}
    </Store.Provider>
  )
}

export const useStore = () => {
  return useContext(Store)
}


export default StoreProvider
