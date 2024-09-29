'use client'
import React, { useState } from 'react'
import ProfileCard from './_components/ProfileCard'
import Tabs from './_components/Tabs'

const page = () => {

  const [following, setFollowing] = useState(false);
  function toggleFollow() {
    setFollowing(prev => !prev)
  } 

  return (
    <div className=''>
        <div className="cover-photo w-100 h-[30vh] rounded-lg bg-[url('https://as1.ftcdn.net/v2/jpg/06/51/16/74/1000_F_651167466_J3M8IuCVDSjUQJ7JrsEucttoWT45caA2.jpg')] bg-cover bg-no-repeat"></div>
        <Tabs />
        <ProfileCard following={following} toggleFollow={toggleFollow}/>
    </div>
  )
}

export default page