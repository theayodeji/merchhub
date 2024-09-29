import React from 'react'
import TopPanel from "./_components/TopPanel"
import BottomPanel from "./_components/BottomPanel"

const page = () => {
  return (
    <div className='dashboard'>
        <div className="wrapper px-5 flex flex-col">
            <TopPanel />
            <br />
            <BottomPanel/>
        </div>
    </div>
  )
}

export default page