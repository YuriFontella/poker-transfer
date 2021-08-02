import Auth from '@/src/layouts/Auth'

import Can from '@/src/libs/can'

import Index from '@/src/components/pages/transfers'
import Permission from '@/src/components/helpers/permission'

import { useEffect } from 'react'
import { useStore } from '@/src/contexts/store'
import { useSession } from 'next-auth/client'

const Transfers = ({ query }) => {

  const [session] = useSession()

  const { dispatch } = useStore()

  useEffect(() => {
    if (session.role === 'user') {
      dispatch({ type: 'title', title: 'Acesso negado' })
    }
  }, [dispatch, session])

  return (
    <Can
      rule="transfers"
      yes={() => <Index query={query} />}

      no={() =>
        <Permission />
      }
    />
  )
}

Transfers.Layout = Auth

export async function getServerSideProps({ query }) {

  return {
    props: { query }
  }
}

export default Transfers