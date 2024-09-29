// components/LeftSidebar.js
import React from 'react';
import Logo from "./Logo"
import { creatorLinks, customerLinks, adminLinks, commonLinks } from '../../constants/index';
import Link from 'next/link';

const LeftSidebar = ({ userRole } : {userRole : string}) => {
  let links;

  switch (userRole) {
    case 'creator':
      links = [...creatorLinks];
      break;
    case 'customer':
      links = [...customerLinks];
      break;
    case 'admin':
      links = [...adminLinks];
      break;
    default:
      links = commonLinks;
  }

  return (
    <div className="h-full w-max shadow-2xl text-dark fixed left-0 top-0 hidden sm:flex flex-col rounded-e-md lg:px-5 lg:pe-8 py-5 bg-white">
      <Logo />
      <nav className="flex flex-col p-4 items-start gap-3 mt-[15%]">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className=" p-2 flex items-center rounded hover:bg-gray-100 transition w-full"
          >
            <img
              src={link.image}
              alt={`${link.name} icon`}
              className="h-10 w-10 lg:mr-2"
            />
            <span className="hidden lg:block text-dark-1">{link.name}</span>
          </a>
        ))}
      </nav>
      <div className='flex flex-col lg:flex-row w-full items-center justify-between mt-auto mb-4'>
        {
          commonLinks.map((link, i) => (
            <Link key={i} href={link.href} className='flex gap-1 items-center'>
              <img src={link.image} alt="" />
              <span className='hidden lg:block text-sm'>{link.name}</span>
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default LeftSidebar;
