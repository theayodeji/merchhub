// components/LeftSidebar.js
import React from 'react';
import Logo from "./Logo"
import { creatorLinks, customerLinks, adminLinks, commonLinks } from '../../constants/index';

const LeftSidebar = ({ userRole } : {userRole : string}) => {
  let links;

  switch (userRole) {
    case 'creator':
      links = [...creatorLinks, ...commonLinks];
      break;
    case 'customer':
      links = [...customerLinks, ...commonLinks];
      break;
    case 'admin':
      links = [...adminLinks, ...commonLinks];
      break;
    default:
      links = commonLinks;
  }

  return (
    <div className="h-full w-max bg-gray-200 text-white absolute left-0 top-0 hidden md:block">
      <Logo />
      <nav className="flex flex-col p-4">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="mb-2 p-2 flex items-center rounded hover:bg-gray-700 transition"
          >
            <img
              src={link.image}
              alt={`${link.name} icon`}
              className="h-6 w-6 mr-2"
            />
            <span className="hidden lg:block text-dark-1">{link.name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default LeftSidebar;
