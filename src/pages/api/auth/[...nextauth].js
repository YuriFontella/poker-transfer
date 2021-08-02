import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { LOGIN } from '@/src/graphql/queries'

import { graphQLClient } from '@/src/graphql/client'

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      authorize: async ({ email, password }) => {

        const variables = { email, password }

        try {

          const { data } = await graphQLClient.request({ query: LOGIN, variables })

          if (data.auth.user)
            return data.auth

        } catch (e) {

          throw '/login?error=true'
        }
      }
    })
  ],

  debug: false,

  callbacks: {

    jwt: async (token, response, account) => {

      const isSignIn = (response) ? true : false

      if (isSignIn) {

        token.access_token = response.token

        token.name = response.user.name
        token.email = response.user.email
        token.picture = response.user.image

        token.role = response.user.role

      }

      return token

    },
    session: async (session, token) => {

      session.access_token = token.access_token

      session.user.name = token.name
      session.user.email = token.email
      session.user.image = token.picture

      session.role = token.role

      return session
    }
  },
  session: {
    jwt: true
  }
})