const Loading = ({ color }) => {

  return (
    <div className="flex justify-center items-center py-4 relative z-50">
      <div className={`rounded-full animate-spin duration-300 w-5 h-5 border-t-2 ${color === 'blue' ? 'border-blue-700' : color === 'white' ? 'border-white' : 'border-black'}`}></div>
    </div>
  )
}

export default Loading