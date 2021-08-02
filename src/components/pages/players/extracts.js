import Loader from "@/src/libs/loader"

const Extracts = ({ item }) => {

  return (
    <div className="bg-white rounded shadow px-6 pt-6 pb-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-gray-800 text-sm tracking-wide font-semibold leading-relaxed">Extrato</h1>
          <p className="text-gray-500 text-xs">Todas as movimentações feitas no sistema</p>
        </div>
      </div>
      <ul className="divide-y divide-gray-200 mt-6">
        <Loader
          source={item.coins}
          component={(item, index) =>
            <li key={index} className="py-2">
              <a className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-800">
                    {item.extract.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.extract.user.name} em {item.created_at}
                  </p>
                </div>
                <div>
                  <p className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded ${item.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.balance}
                  </p>
                </div>
              </a>
            </li>
          }
        />
      </ul>
    </div>
  )
}

export default Extracts