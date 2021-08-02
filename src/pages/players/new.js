import Auth from "@/src/layouts/Auth"

import { useMutation } from 'graphql-hooks'

import { useStore } from "@/src/contexts/store"

import { useEffect } from "react"

import { useForm } from 'react-hook-form'

import { NEW_PLAYER } from '@/src/graphql/queries'

const New = () => {

  const [newPlayer, response] = useMutation(NEW_PLAYER)

  const { dispatch } = useStore()

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = (player) => {
    if (Object.values(player).some(x => x === "")) {
      return
    }

    newPlayer({ variables: { player } })
  }

  useEffect(() => {
    dispatch({ type: 'title', title: 'Novo Jogador' })

    if (response.data?.player) {
      reset()
    }
  }, [dispatch, response.data, reset])

  return (
    <main>
      <div className="rounded shadow-lg bg-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden">

            <div className="space-y-6">
              <div className="items-center w-full p-6 pt-8 space-y-4 md:inline-flex">
                <h2 className="text-xs font-medium text-gray-700 max-w-sm sm:mx-auto md:w-1/3">
                  Nome
                </h2>
                <div className="w-full sm:max-w-sm sm:mx-auto md:w-2/3">
                  <div className="relative">
                    <input {...register('name')} placeholder="Nome do jogador" type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-xs border-blue-300 rounded-md" />
                  </div>
                </div>
              </div>
              <hr />
              <div className="items-center w-full p-6 sm:p-6 space-y-4 md:inline-flex">
                <h2 className="text-xs font-medium text-gray-700 max-w-sm sm:mx-auto md:w-1/3">
                  Acesso ao painel
                </h2>
                <div className="w-full sm:max-w-sm sm:mx-auto space-y-5 md:w-2/3">
                  <div>
                    <div className="relative">
                      <input {...register('email')} placeholder="Informe o e-mail" type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-xs border-blue-300 rounded-md" />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <input {...register('password')} placeholder="Defina uma senha" type="password" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-xs border-blue-300 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex w-full items-end justify-end px-6 pb-6">
                <button
                  type="submit"
                  className="justify-center py-2 px-3 border border-transparent text-xs font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition active:bg-blue-400"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

New.Layout = Auth

export default New