import React from 'react'
import FollowButton from "@/components/shared/FollowButton"

const ProfileCard = ({following, toggleFollow}) => {

  return (
    <div className="text-center flex flex-col items-center w-[260px] p-5 rounded-xl shadow-xl bg-white sticky ms-[5%] mt-[8%] bottom-[20%] translate-y-[0]">
      <img
        src="https://nftevening.com/wp-content/uploads/2022/05/Lil-Baby-DeadFellaz-3439.png"
        alt=""
        className="rounded-full"
        width={100}
      />
      <h5 className="text-lg font-bold mb-0">
        Enrico Cole
        <span>
          <img className="w-4 inline" src="\assets\verified-badge.svg" alt="" />
        </span>
      </h5>
      <p className="text-gray-400 text-sm">Youtuber</p>
      <p className="text-xs my-8">
        A passionate artist and NFT enthusiast set out with a message of freedom
        for the masses
      </p>
      <a href="#" className="text-red-500 font-semibold text-sm">
        htts://enroco.net
      </a>
      <div className="flex items-center justify-around w-full my-5">
        <FollowButton following={following} toggleFollow={toggleFollow}/>
        <img
          src="/assets/money-bag.svg"
          alt=""
          className=" rounded-full p-3 border border-gray-300 cursor-pointer"
          width={54}
        />
        <img
          src="/assets/more.svg"
          alt=""
          className=" rounded-full p-3 border border-gray-300 cursor-pointer"
          width={54}
        />
      </div>
      <div className="flex items-center justify-around w-1/2 my-5">
        <a href="#">
          <img src="/assets/tiktok.svg" alt="" width={24} />
        </a>
        <a href="#">
          <img src="/assets/x.svg" alt="" width={24} />
        </a>
        <a href="#">
          <img src="/assets/youtube.svg" alt="" width={24} />
        </a>
      </div>

      <span className="text-sm text-gray-400">Member since March, 2024</span>
    </div>
  );
}

export default ProfileCard