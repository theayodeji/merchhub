import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={"/"}>
      <div className='hidden relative w-max'>
        <Image src={'/assets/logo.png'} width={180} height={0} layout='intrinisc'/>
      </div>
    </Link>
  )
}

export default Logo