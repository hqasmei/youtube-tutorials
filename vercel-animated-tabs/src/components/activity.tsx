import React from 'react';

const Activity = () => {
  return (
    <div className="flex flex-col">
      <span className="text-4xl  px-4 md:px-8">Activity</span>
      <div className="border-t border-zinc-800 mt-10">
        <div className="border-r border-zinc-800 w-[300px] h-screen hidden md:flex"></div>
      </div>
    </div>
  );
};

export default Activity;
