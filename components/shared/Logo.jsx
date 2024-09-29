import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={"/"}>
      <div className='block lg:hidden'>
        <img className='mx-auto' src="/assets/logo-sm.png" alt="Logo" style={{width: '50px', height: 'auto'}}/>
      </div>
      <div className='hidden lg:block'>
        <img className='mx-auto' src="/assets/logo.png" alt="Logo" style={{width: '160px', height: 'auto'}}/>
      </div>
    </Link>
  )
}

export default Logo