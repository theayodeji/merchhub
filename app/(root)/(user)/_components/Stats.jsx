import React from 'react'

const Stats = () => {
  return (
    <>
        <div className="stat-1 w-max p-3 pe-5 bg-[#ffffff8c] backdrop-blur-sm rounded-3xl absolute flex items-center gap-3 bottom-[50%] right-[-10%] md:right-[-5%]  shadow-md scale-75 md:scale-100">
            <img src="/assets/promo2.png" alt="" className='object-cover aspect-sqaure w-[50px] h-[50px] object-right bg-red-400 rounded-full' />
            <div>
                <h6 className='font-bold'>Summer Top</h6>
                <p className='text-xs'>From Adison Baker</p>
                <img src="assets/rating-full.png" alt="" className='w-24'/>
            </div>
        </div>
        <div className="stat-1 w-max p-3 pe-5 bg-[#171717] rounded-3xl absolute flex items-center gap-3  bottom-[30%] left-[-10%] md:left-[inherit] shadow-md text-white scale-75 md:scale-100">
            <img src="assets/herosmall.png" alt="" className='object-cover aspect-sqaure w-[50px] h-[50px] object-top bg-red-400 rounded-full' />
            <div>
                <h6 className='font-bold text-sm'> <span className='text-red-500 font-extrabold'>#1</span> Trending Creator</h6>
                <p className='text-xs'>Alyssa Reid</p>
            </div>
            <img src="/assets/fire-joypixels.gif" alt="" className="stat-1 w-12 absolute flex items-center gap-3 top-[-20%] left-[-8%] text-white"/>
        </div>
    </>
  )
}

export default Stats