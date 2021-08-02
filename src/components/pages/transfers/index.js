import Auth from "@/src/layouts/Auth"

import { useStore } from "@/src/contexts/store"

import { useEffect, useState } from "react"

import { useQuery, useSubscription } from 'graphql-hooks'

import { PLAYER, NOTIFICATION } from "@/src/graphql/queries"

import Loader from "@/src/libs/loader"

import Payment from "@/src/components/pages/players/payment"
import Send from "@/src/components/pages/players/send"
import Extracts from "@/src/components/pages/players/extracts"

const Index = ({ query }) => {

  const [spinner, setSpinner] = useState(true)

  const { dispatch } = useStore()

  const { data, loading, refetch } = useQuery(PLAYER, { variables: { id: query.id } })

  useSubscription({ query: NOTIFICATION }, () => {
    setSpinner(false)
    refetch()
  })

  useEffect(() => {
    dispatch({
      type: 'title', title: data?.player?.name
    })
  }, [dispatch, data?.player])

  return (
    <main>
      <Loader
        source={data?.player}
        spinner={spinner}
        loading={{ status: loading, color: 'white' }}
        component={(item) =>
          <div className="flex flex-col gap-1">
            <Payment item={item} />
            <Send item={item} />
            <Extracts item={item} />
          </div>
        }
      />
    </main>
  )
}

Index.Layout = Auth

export default Index