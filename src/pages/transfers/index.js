import Auth from "@/src/layouts/Auth"

import { useStore } from "@/src/contexts/store"
import { useCallback, useEffect, useState } from "react"
import { useMutation, useQuery } from "graphql-hooks"

import { REMOVE_TRANSFER, TRANSFERS } from "@/src/graphql/queries"

import Loader from "@/src/libs/loader"

import Empty from "@/src/components/helpers/empty"
import Can from "@/src/libs/can"

const Transfers = () => {

  const [index, setIndex] = useState()

  const { data, loading } = useQuery(TRANSFERS)

  const [removeTransfer, response] = useMutation(REMOVE_TRANSFER)

  const remove = (id, index) => {
    setIndex(index)
    removeTransfer({ variables: { id } })
  }

  const { dispatch } = useStore()

  useEffect(() => {
    dispatch({ type: 'title', title: 'Transferências' })

    if (response.data?.transfer) {
      data.transfers.splice(index, 1)
    }

  }, [dispatch, response.data, data?.transfers, index])

  return (
    <div className="bg-white shadow rounded">
      <Loader
        source={data?.transfers}
        map={false}
        component={(source) =>
          <div className="flex flex-col">
            <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 rounded">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      DE
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      PARA
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      VALOR
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      USUÁRIO
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {source.map((item, index) =>
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-xs font-medium text-gray-700">{item.from.name}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-xs font-medium text-gray-700">{item.to.name}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {item.value}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">{item.performed.name}</td>

                      <Can
                        rule="canceled_transfer"
                        yes={() =>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-xs font-medium">
                            <button className="text-red-600 appearance-none bg-transparent border-none text-xs" onClick={() => remove(item.id, index)}>
                              Cancelar
                            </button>
                          </td>
                        }
                      />

                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        }
        blank={false}
        template={() =>
          <div className="pt-2 pb-6">
            <Empty />
          </div>
        }
      />
    </div>
  )
}

Transfers.Layout = Auth

export default Transfers