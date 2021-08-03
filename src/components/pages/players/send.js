import { useForm, Controller } from 'react-hook-form'

import { useManualQuery, useMutation } from 'graphql-hooks'

import { NEW_TRANSFER, PLAYERS } from "@/src/graphql/queries"

import { RadioGroup } from '@headlessui/react'

import Loader from '@/src/libs/loader'

import { UserIcon } from "@heroicons/react/solid"

import { toast } from '@/src/libs/toast'

import { useEffect } from 'react'

const Send = ({ item }) => {

  const { register, handleSubmit, control, reset } = useForm()

  const [fetch, { data, loading }] = useManualQuery(PLAYERS)

  const [newTransfer, response] = useMutation(NEW_TRANSFER)

  const players = async (search) => {
    if (search === "")
      return

    return await fetch({
      variables: {
        limit: 0, offset: 0, name: search
      }
    })
  }

  const onSubmit = (transfer) => {

    if (Object.values(transfer).some(x => x === "" || x === undefined)) {
      return
    }

    const balance = parseInt(item.credits.value - item.debts.value)

    if (parseInt(transfer.value) > balance) {
      return toast('Saldo insuficiente para transferência')
    }

    transfer.from = parseInt(item.id)
    transfer.to = parseInt(transfer.to)

    data.players = null

    newTransfer({ variables: { transfer } })
  }

  useEffect(() => {
    if (response?.data?.transfer) {
      reset()
      toast('A transferência foi concluida!')
    }
  }, [response.data, reset])

  return (
    <div className="bg-white rounded shadow">
      <div className="p-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-gray-800 text-sm tracking-wide font-semibold leading-relaxed">Quanto deseja enviar?</h1>
            <p className="text-gray-500 text-xs">Informe o valor da transferência</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div>
            <label className="block text-xs font-medium text-gray-700">Valor</label>
            <input {...register('value')} type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-xs border-blue-300 rounded-md" />
          </div>

          <div className="flex justify-between mt-6">
            <div>
              <h1 className="text-gray-800 text-sm tracking-wide font-semibold leading-relaxed">Para quem você quer transferir?</h1>
              <p className="text-gray-500 text-xs">Encontre um jogador e selecione para a transferência</p>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-xs font-medium text-gray-700">Jogador</label>
            <input onChange={(e) => players(e.target.value)} type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-xs border-blue-300 rounded-md" />
          </div>

          <div>
            <Controller
              name="to"
              control={control}
              render={({ field: { onChange, value } }) =>
                <RadioGroup value={value} onChange={onChange}>
                  <Loader
                    source={data?.players}
                    loading={{ status: loading, color: 'blue' }}
                    blank={false}
                    component={(item, index) =>
                      <RadioGroup.Option value={item.id} key={index}>
                        {({ checked }) => (
                          <div className="cursor-pointer flex items-center mt-4">
                            <div className={`${checked ? 'bg-green-500' : 'bg-gray-400'} flex flex-col justify-center rounded-full items-center p-2 mr-2`}>
                              <UserIcon className="text-white w-5 h-5" />
                            </div>
                            <div className={`${checked ? 'text-green-600' : 'text-gray-800'} font-semibold text-xs capitalize`}>
                              {item.name}
                            </div>
                          </div>
                        )}
                      </RadioGroup.Option>
                    }
                  />
                </RadioGroup>
              }
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="justify-center w-full py-2 px-3 border border-transparent text-xs font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition active:bg-blue-400"
            >
              Transferir
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Send