import { useSession } from 'next-auth/client'

import Error from '@/src/components/layouts/404'

import Private from '@/src/layouts/Private'

import Loading from '@/src/components/libs/loading'

import { graphQLClient } from '@/src/graphql/client'

const Auth = ({ children }) => {

  const [session, loading] = useSession()

  if (loading)
    return <Loading />

  else if (!session)
    return <Error />

  graphQLClient.setHeader('x-access-token', session.access_token)

  switch (session.role) {
    default:
      Auth.Layout = Private
  }

  return <Auth.Layout>{children}</Auth.Layout>
}

export default Auth
