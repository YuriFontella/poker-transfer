import Link from 'next/link'

import { signOut } from 'next-auth/client'

import { LogoutIcon } from '@heroicons/react/outline'

import { useStore } from "@/src/contexts/store"

import { useSubscription } from 'graphql-hooks'

import { NOTIFICATION } from "@/src/graphql/queries"

import { graphQLClient } from '@/src/graphql/client'

const Private = ({ children }) => {

  const { state, dispatch } = useStore()

  useSubscription({ query: NOTIFICATION }, () => {
    graphQLClient.cache.clear()
  })

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col bg-gradient-to-r from-blue-700 to-blue-500 h-56 rounded rounded-t-none shadow-lg">
          <div className="flex items-center gap-4 border-b border-blue-500 px-6 py-4">
            <div>
              <h1 className="text-sm font-bold text-white">Poker</h1>
            </div>
            <div>
              <ul className="flex text-white gap-4 text-xs">
                <li>
                  <Link href="/players">
                    <a>
                      Jogadores
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/transfers">
                    <a>
                      Transferências
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-1 justify-end items-center gap-4">
              <div className="hidden md:block">
                <input type="text" className="h-7 appearance-none relative block w-44 p-2 border-none placeholder-gray-500 text-xs text-gray-800 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10" placeholder="Buscar" onChange={(e) => dispatch({ type: 'search', search: e.target.value })} />
              </div>
              <div>
                <LogoutIcon className="h-5 w-5 text-white cursor-pointer" onClick={() => signOut({ redirect: true, callbackUrl: '/' })} />
              </div>
            </div>
          </div>

          <div className="px-6 mt-8">
            <h1 className="text-white font-bold text-xl capitalize">{state.title}</h1>
          </div>
        </div>
        <div className="px-2 md:px-6 -mt-14 pb-6">
          {children}
        </div>
      </div>
    </main>

  )
}

export default Private
