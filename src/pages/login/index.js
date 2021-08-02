import { LockClosedIcon, UserCircleIcon, BanIcon } from '@heroicons/react/solid'

import { useForm } from 'react-hook-form'

import { signIn, getCsrfToken, getSession } from 'next-auth/client'

import { useRouter } from 'next/router'

const Login = () => {

  const route = useRouter()

  const { register, handleSubmit } = useForm()

  const onSubmit = (credentials) => {
    signIn('credentials', credentials)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-0">
      <div className="max-w-sm w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <UserCircleIcon className="h-16 w-16 text-blue-500" aria-hidden="true" />
          </div>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="current-email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="E-mail"
                defaultValue="admin@poker.com"
                {...register('email')}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                defaultValue="123456"
                {...register('password')}
              />
            </div>

            {route.query.error &&
              <div className="flex space-x-2 items-center text-white text-sm p-3 rounded bg-red-500">
                <BanIcon className="w-5 h-5" />
                <span>
                  <b className="capitalize">Atenção!</b> Usuário ou senha incorretos.
                </span>
              </div>
            }
          </div>

          <div>
            <button
              type="submit"
              className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition active:bg-blue-400"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
              </span>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )

}

export async function getServerSideProps(context) {

  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/players'
      }
    }
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}

export default Login
