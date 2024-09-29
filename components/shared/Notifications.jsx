import React from 'react'

const Notifications = () => {
  return (
    <div className='ml-auto mr-4 cursor-pointer'>
        <div className="bell relative ">
            <img src="/assets/Bell_fill.svg" alt="" width={32}/>
            <div className="count aspect-square text-xs rounded-[50%] bg-red-500 border-gray-100 border-4 absolute top-[-20%] right-[-10%] flex "><span className='flex items-center p-1 text-white font-semibold'>4</span></div>
        </div>
    </div>
  )
}

export default Notifications