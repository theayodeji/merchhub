import React from 'react'

const Avatar = ({image, username}) => {
  return (
    <div className='flex items-center gap-2 cursor-pointer'>
        <img src={image} alt="" className='w-12 aspect-square rounded-full shadow-xl object-cover'/>
        <div className='hidden md:block'>
            <span className=' text-sm font-semibold'>{username}</span>
        </div>
    </div>
  )
}

export default Avatar