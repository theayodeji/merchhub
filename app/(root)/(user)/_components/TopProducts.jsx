import React from 'react'
import ProductsList from './ProductsList'
import { products } from '@/constants'
import Link from 'next/link'


const TopProducts = () => {

  return (
    <div className='isolate z-10 mb-24 '>
        <div className="w-full flex justify-between items-center mb-6 mt-24">
        <h2 className="font-semibold text-3xl">Top Products</h2>
        <Link href={"#"}>
          <span className="font-semibold">See All</span>
        </Link>
      </div>
        <ProductsList products={products}/>
    </div>
  )
}

export default TopProducts