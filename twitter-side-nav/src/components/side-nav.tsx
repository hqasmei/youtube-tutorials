'use client';

import React from 'react';

import Link from 'next/link';

import useNavigation from '@/hook/use-navigation';
import { Icon } from '@iconify/react';

const SideNav = () => {
  const {
    isHomeActive,
    isExploreActive,
    isNotificationsActive,
    isMessagesActive,
  } = useNavigation();

  return (
    <div className="flex-col space-y-4 items-center py-8 hidden sm:flex border-r border-zinc-700 h-full  w-[120px] md:w-[250px] md:items-start fixed">
      <Link href="/" className="flex flex-row space-x-1 items-center hover:bg-white/10 p-4 rounded-full duration-200">
        <Icon icon="bi:twitter-x" width="38" height="38" />
      </Link>

      <Link href="/" className="flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 hover:bg-white/10 relative">
        {isHomeActive ? (
          <Icon icon="mingcute:home-5-fill" width="38" height="38" />
        ) : (
          <Icon icon="mingcute:home-5-line" width="38" height="38" />
        )}
        <span
          className={`text-2xl pt-2 hidden md:flex ${
            isHomeActive ? 'font-bold' : ''
          }`}
        >
          Home
        </span>
        {/* <span className='h-2 w-2 rounded-full bg-sky-500 absolute top-3 right-[16px] md:right-[100px]'></span> */}
      </Link>
      <Link href="/explore" className="flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 hover:bg-white/10">
        {isExploreActive ? (
          <Icon
            icon="uil:search"
            width="38"
            height="38"
            className="stroke-current stroke-5"
          />
        ) : (
          <Icon icon="uil:search" width="38" height="38" />
        )}
        <span
          className={`text-2xl pt-2 hidden md:flex ${
            isExploreActive ? 'font-bold' : ''
          }`}
        >
          Explore
        </span>
      </Link>
      <Link
        href="/notifications"
        className="flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 hover:bg-white/10"
      >
        {isNotificationsActive ? (
          <Icon icon="mingcute:notification-fill" width="38" height="38" />
        ) : (
          <Icon icon="mingcute:notification-line" width="38" height="38" />
        )}
        <span
          className={`text-2xl pt-2 hidden md:flex ${
            isNotificationsActive ? 'font-bold' : ''
          }`}
        >
          Notifications
        </span>
      </Link>
      <Link href="/messages" className="flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 hover:bg-white/10">
        {isMessagesActive ? (
          <Icon icon="ic:baseline-email" width="38" height="38" />
        ) : (
          <Icon icon="ic:outline-email" width="38" height="38" />
        )}
        <span
          className={`text-2xl pt-2 hidden md:flex ${
            isMessagesActive ? 'font-bold' : ''
          }`}
        >
          Messages
        </span>
      </Link>
    </div>
  );
};

export default SideNav;
