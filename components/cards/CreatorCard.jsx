"use client"

import Link from "next/link";
import React, { useState } from "react";
import FollowButton from "../shared/FollowButton";

const CreatorCard = ({ creator }) => {
  const [following, setFollowing] = useState(false)

  const handleFollow = (event) => {
    // Stop click event from propagating to parent elements
    event.preventDefault();
    event.stopPropagation();
    setFollowing(!following)
  };
  
  return (
    <Link href={`/creators/${creator.id}`} className="creator-card flex items-center bg-white p-4 rounded-lg shadow-lg">
      {/* Creator Image */}
      <img
        src={creator.image}
        alt={creator.name}
        className="w-16 h-16 object-cover rounded-full"
      />
      {/* Creator Info */}
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-semibold">
            {creator.name}
            <span><img className="w-3 inline" src="\assets\verified-badge.svg" alt="" /></span>
        </h3>
        <p className="text-gray-600">{creator.description}</p>
      </div>
      {/* Buttons */}
      <div className="flex space-x-2">
        <FollowButton following={following} toggleFollow={handleFollow}/>
      </div>
    </Link>
  );
};

export default CreatorCard;
