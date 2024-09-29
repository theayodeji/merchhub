import React from 'react'

const Breadcrumb = ({username}) => {
  return (
    <h1 className='text-lg sm:text-xl font-bold mr-[5%] bg-white p-2 rounded-xl'>Hello <span className='text-red-500'>{username}!</span></h1>
  )
}

export default Breadcrumb