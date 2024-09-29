import Button from '@/components/shared/Button'
import React from 'react'
import DashboardCard from "../../../../../components/cards/DashboardCard"


function Stat({statName, figure, math}) {
  return (
    <div className='xl:p-2 lg:p-5 p-3 flex flex-col'>
        <div className="stat-name flex items-center gap-2">
            <div className="w-3 rounded-full bg-red-500 aspect-square"></div>
            <span className='lg:text-sm text-[10px] text-center'>{statName}</span>
        </div>
        <div className="figures flex items-center gap-2 self-end">
            <h1 className="text-3xl font-semibold">{figure}</h1>
            <span className={math > 0 ? 'bg-green-300 text-green-800 font-normal px-1.5 py-0.5 rounded-xl w-max text-xs text-center align' : 'bg-red-300 text-red-700 font-normal px-1.5 py-0.5 rounded-xl w-max text-xs text-center align' } >{math}%</span>
        </div>
    </div>
  )
}

function AvatarIntro({}) {
    
}

const TopPanel = () => {
  return (
    <div className='flex items-stretch gap-3 mt-5'>
        <DashboardCard>
          <Stat figure={2500} math={10} statName={'Total Balance'} />
          <Stat figure={5} math={-20} statName={'Orders Today'} />
          <Stat figure={200} math={2} statName={'Completed Orders'} />
          <Stat figure={200} math={-3} statName={'Completed Orders'} />
        </DashboardCard>

        <div className='w-max bg-[url("/assets/avatar.webp")] relative bg-cover bg-no-repeat p-7 rounded-lg items-start flex-col shadow-md isolate xl:flex hidden'>
            <div className="overlay h-full w-full bg-[#0f0f0f93] absolute top-0 left-0 rounded-xl -z-10"></div>
            <h3 className="font-bold text-xl text-white mb-0.5 underline">Subscribe to Premium</h3>
            <p className='text-sm mb-5 text-white'>To get the best MerchHub has to offer</p>
            <Button variant='secondary'>Get Started</Button>
            <img src="" alt="" />
        </div>
    </div>
  )
}

export default TopPanel