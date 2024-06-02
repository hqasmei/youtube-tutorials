import React from 'react';

import FollowingPage from './following';
import ForYouPage from './for-you';

const HomeFeed = () => {
  // const framer = useTabs(hookProps);

  return (
    <div className="flex flex-col flex-1">
      <div
        className={`flex flex-col border-b border-zinc-700 sticky inset-x-0 pt-2 top-0 z-30 w-full transition-all backdrop-blur-xl  md:translate-y-0`}
      >
        <span className=" flex px-4 font-bold text-2xl py-4">Home</span>
      </div>

      <div className="pt-10 flex  flex-1 h-screen">
        <ForYouPage />
      </div>
    </div>
  );
};

export default HomeFeed;
