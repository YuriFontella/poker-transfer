import Router from 'next/router'

export default function Example() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="flex justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-5xl font-dark font-bold mb-2">404</div>
          <p className="text-lg">
            Página não encontrada.
          </p>
          <p className="mb-8 text-sm">
            Mas não se preocupe, volte para a página de login.
          </p>

          <button className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700" onClick={() => Router.push('/login')}>Log in</button>
        </div>
      </div>
    </div>
  )
}
