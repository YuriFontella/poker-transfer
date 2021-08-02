import { GraphQLClient, ClientContext } from 'graphql-hooks'

import Error from '@/src/libs/error'

import { SubscriptionClient } from 'subscriptions-transport-ws'

import memCache from 'graphql-hooks-memcache'

const options = {
  lazy: true,
  reconnect: true
}

const websocket = process.browser ? new SubscriptionClient(process.env.WS, options) : null

const graphQLClient = new GraphQLClient({
  url: process.env.GRAPHQL,
  cache: memCache(),
  logErrors: process.env.NODE_ENV === 'development',
  subscriptionClient: websocket,
  onError: ({ result }) => {
    Error(result)
  }
})

export {
  graphQLClient, ClientContext
}