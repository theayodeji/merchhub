import React from 'react'

const FollowButton = ({following, toggleFollow}) => {
  return (
    <button 
    className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg"
    onClick={toggleFollow}
  >
    {following == true ? 'Following' : 'Follow'}
  </button>
  )
}

export default FollowButton