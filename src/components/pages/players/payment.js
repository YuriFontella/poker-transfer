import { useForm, Controller } from 'react-hook-form'

import { CurrencyDollarIcon, PlusIcon, MinusIcon } from "@heroicons/react/solid"

import { RadioGroup } from '@headlessui/react'

import { useMutation } from 'graphql-hooks'

import { NEW_COIN } from '@/src/graphql/queries'

import { useEffect } from 'react'

import { toast } from '@/src/libs/toast'

const Payments = ({ item }) => {

  const { register, handleSubmit, reset, control } = useForm()

  const [newCoin, response] = useMutation(NEW_COIN)

  const onSubmit = (coin) => {

    if (Object.values(coin).some(x => x === "" || x === undefined)) {
      return
    }

    coin.user_id = parseInt(item.id)

    newCoin({ variables: { coin } })
  }

  useEffect(() => {
    if (response?.data?.coin) {
      reset()
      toast('Pagamento adicionado!')
    }
  }, [response.data, reset])

  return (
    <div className="bg-white rounded shadow">
      <div className="p-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-gray-800 text-sm tracking-wide font-semibold leading-relaxed">Acrescentar ou descontar valores </h1>
            <p className="text-gray-500 text-xs">Selecione a opção de crédito ou débito</p>
          </div>
          <div className="flex items-center">
            <div className="flex gap-1 items-center">
              <CurrencyDollarIcon className="text-yellow-500 h-6 w-6" />
              <div>
                <p className="text-md font-semibold text-gray-600">{item.credits.value - item.debts.value || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value } }) =>
            <RadioGroup value={value} onChange={onChange} className="flex gap-4 overflow-hidden px-6">
              <RadioGroup.Option value="credit">
                {({ checked }) => (
                  <div className={`flex gap-4 items-center p-3 h-full rounded-full cursor-pointer bg-green-50 ${checked ? 'bg-green-400' : 'bg-white'}`}>
                    <div className="flex items-center justify-center rounded-full w-8 h-8">
                      <PlusIcon className={`w-5 h-5 ${checked ? 'text-white' : 'text-green-500'}`} />
                    </div>
                  </div>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="debt">
                {({ checked }) => (
                  <div className={`flex gap-4 items-center p-3 h-full rounded-full cursor-pointer bg-red-50 ${checked ? 'bg-red-400' : 'bg-white'}`}>
                    <div className="flex items-center justify-center rounded-full w-8 h-8">
                      <MinusIcon className={`w-5 h-5 ${checked ? 'text-white' : 'text-red-500'}`} />
                    </div>
                  </div>
                )}
              </RadioGroup.Option>
            </RadioGroup>
          }
        />
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-2 justify-between w-full">
            <div className="w-full">
              <label className="block text-xs font-medium text-gray-700">Valor</label>
              <input {...register('balance')} type="text" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-xs border-blue-300 rounded-md" />
            </div>

            <div className="flex items-end justify-end w-full md:w-32">
              <button
                type="submit"
                className="justify-center w-full py-2 px-3 border border-transparent text-xs font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition active:bg-blue-400"
              >
                Enviar saldo
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Payments