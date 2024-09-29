import PromoBanner from '@/components/promo/PromoBanner'
import PromoCard2 from '@/components/promo/PromoCard2'
import LimitedTimeOffer from '@/components/promo/LimitedTimeOffer'
import React from 'react'
import Hero from './_components/Hero'
import Categories from './_components/Categories'
import TopProducts from './_components/TopProducts'
import HowItWorks from './_components/Process'
import SuggestedCreators from './_components/SuggestedCreators'
import Testimonials from './_components/Testimonials'
import { creators } from '@/constants'

const page = () => {

  return (
    <>
      <Hero />
      <Categories />
      <TopProducts />
      <PromoBanner />
      <HowItWorks />
      <div className="flex flex-col lg:flex-row gap-4 items-stretch">
        <SuggestedCreators creators={creators}/>
        <PromoCard2 />
      </div>
      <LimitedTimeOffer/>
      <Testimonials />
    </>
  )
}

export default page