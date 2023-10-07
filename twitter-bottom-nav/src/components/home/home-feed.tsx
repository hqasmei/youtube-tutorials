'use client';

import React, { useState } from 'react';

import useScrollingEffect from '@/hook/use-scroll';
import { useTabs } from '@/hook/use-tabs';
import { Framer } from '@/lib/framer';

import FollowingPage from './following';
import ForYouPage from './for-you';

const HomeFeed = () => {
  const scrollDirection = useScrollingEffect();
  const headerClass =
    scrollDirection === 'up' ? 'translate-y-0' : 'translate-y-[-100%]';

  const [hookProps] = useState({
    tabs: [
      {
        label: 'For you',
        children: <ForYouPage />,
        id: 'For you',
      },
      {
        label: 'Following',
        children: <FollowingPage />,
        id: 'Following',
      },
    ],
    initialTabId: 'Matches',
  });
  const framer = useTabs(hookProps);

  return (
    <div className="flex flex-col flex-1">
      <div
        className={`flex flex-col border-b border-zinc-700 sticky inset-x-0 pt-2 top-0 z-30 w-full transition-all backdrop-blur-xl  ${headerClass} md:translate-y-0`}
      >
        <span className=" flex px-4 font-bold text-2xl">Home</span>

        <div className="flex flex-row w-full items-center justify-around mt-4">
          <Framer.Tabs {...framer.tabProps} />
        </div>
      </div>

      <div className="pt-10 flex  flex-1 h-screen">
        {framer.selectedTab.children}
      </div>
    </div>
  );
};

export default HomeFeed;
