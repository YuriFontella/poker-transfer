import Auth from "@/src/layouts/Auth"

import Router from 'next/router'

import Link from 'next/link'

import { useStore } from "@/src/contexts/store"

import { useCallback, useEffect, useState } from "react"

import { useQuery } from 'graphql-hooks'

import { PLAYERS } from "@/src/graphql/queries"

import Loader from "@/src/libs/loader"

import { UserIcon, CurrencyDollarIcon, PlusIcon } from "@heroicons/react/solid"

import Empty from "@/src/components/helpers/empty"

const Players = () => {

  const [offset, setOffset] = useState(0)

  const updateData = (prevData, nextData) => {
    if (state.search) {
      return { players: [...nextData.players] }
    }
    return { players: [...prevData.players, ...nextData.players] }
  }

  const { dispatch, state } = useStore()

  useEffect(() => {
    dispatch({
      type: 'title', title: 'Jogadores'
    })
  }, [dispatch])

  const variables = { limit: 3, offset: offset, name: state.search || '' }

  const { data, loading } = useQuery(PLAYERS, { variables: variables, updateData })

  const { players } = data || []

  const redirect = (id) => ({
    pathname: '/players/[id]/transfers',
    query: { id: id }
  })

  return (
    <main className="relative">
      <button className="absolute right-0 -top-20 mt-1.5 p-1.5 text-xs font-medium leading-5 shadow border border-transparent rounded-full bg-white" onClick={() => Router.push('/players/new')}>
        <PlusIcon className="text-gray-900 h-4 w-4" />
      </button>
      <div>
        <ul className="flex flex-col">
          <Loader
            source={players}
            loading={{ status: loading, color: 'white' }}
            component={(item, index) =>
              <Link href={redirect(item.id)} key={index}>
                <a>
                  <li className="border-gray-400 flex flex-row mb-1">
                    <div className="shadow cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-6">
                      <div className="flex flex-col justify-center rounded-full bg-gray-400 items-center p-2 mr-4">
                        <UserIcon className="text-white w-6 h-6" />
                      </div>
                      <div className="flex-1 pl-1 md:mr-16 gap-3">
                        <div className="font-medium text-sm text-gray-800 dark:text-white capitalize">
                          {item.name}
                        </div>
                        <div className="text-gray-600 dark:text-gray-200 text-xs">
                          {item.email}
                        </div>
                      </div>
                      <div>
                        <div className="flex gap-1 items-center">
                          <CurrencyDollarIcon className="text-yellow-500 h-5 w-5" />
                          <div>
                            <p className="text-sm font-semibold text-gray-600">{item.credits.value - item.debts.value || 0}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </a>
              </Link>
            }
            blank={false}
            template={() =>
              <div className="bg-white rounded shadow pt-2 pb-4">
                <Empty />
              </div>
            }
          />
        </ul>
      </div>

      {players?.length >= 3 && offset <= players?.length - 3 && !state.search && (
        <div className="flex justify-center mt-1">
          <button className="w-full bg-gradient-to-r from-blue-700 to-blue-500 shadow p-2 rounded text-white text-xs" onClick={() => setOffset(players.length)}>
            Carregar mais
          </button>
        </div>
      )}
    </main>
  )
}

Players.Layout = Auth

export default Players