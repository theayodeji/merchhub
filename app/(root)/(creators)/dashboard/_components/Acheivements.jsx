import React from 'react'


const Acheivements = ({acheivements}) => {

    const Acheivement = ({category, product, rank}) => (
        <div className='bg-gray-200 p-3 rounded-xl flex gap-3 items-center w-full'>
            <span className="bg-red-500 p-5 text-center flex items-center justify-stretch text-lg md:text-3xl font-semibold text-white rounded-xl">#{rank}</span>
            <div>
                <span className='font-bold'>{category}</span>
                <br />
                {product ? (<span className='text-xs lg:text-sm text-gray-500'>{product}</span>)
                : (
                    <span className='text-xs lg:text-sm text-gray-500'>2-day Streak <img className='inline mt-[-.4rem]' src={"/assets/fire-joypixels.gif"} alt="" width={20} height={20}/> </span>
                )    
            }
            </div>
        </div>
    )

  return (
    <div className='flex flex-col justify-end'>
        <h2 className="text-xl md:text-2xl font-bold mb-3">Your Achievements</h2>
        <div className='bg-red-500 p-5 rounded-xl shadow-md md:flex flex-col items-center justify-around w-max md:w-auto hidden gap-3'>
            {
                acheivements.map((acheivement, i) => (
                    <Acheivement {...acheivement} key={i}/>
                ))
            }
        </div>
    </div>
  )
}

export default Acheivements