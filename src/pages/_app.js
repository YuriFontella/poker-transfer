import '@/src/styles/globals.css'

import { Fragment } from 'react'

import { Provider } from 'next-auth/client'

import { ToastContainer } from '@/src/libs/toast'

import NProgress from 'nprogress'

import Head from 'next/head'

import Router from 'next/router'

import StoreProvider from '@/src/contexts/store'

import { graphQLClient, ClientContext } from '@/src/graphql/client'

NProgress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }) => {

  const Layout = Component.Layout ? Component.Layout : Fragment

  return (
    <Provider session={pageProps.session}>
      <StoreProvider>
        <Head>
          <title>Poker</title>
        </Head>

        <ClientContext.Provider value={graphQLClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ClientContext.Provider>

        <ToastContainer />
      </StoreProvider>
    </Provider>
  )
}

export default App
