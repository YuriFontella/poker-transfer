import { useEffect, useState } from "react"

const Loading = ({ color }) => {

  const [border, setBorder] = useState()

  useEffect(() => {
    setBorder(color)
  }, [color])

  return (
    <div className="flex justify-center items-center py-4">
      <span className={`rounded-full animate-spin duration-300 w-5 h-5 border-t-2 border-${border}`}></span>
    </div>
  )
}

export default Loading