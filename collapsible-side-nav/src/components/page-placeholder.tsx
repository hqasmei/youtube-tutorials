import React from 'react';

export default function PagePlaceholder({ pageName }: { pageName: string }) {
  return (
    <div className="flex flex-1 h-screen sm:h-fit flex-col space-y-2 px-4">
      <span className="font-bold text-3xl">{pageName}</span>
      <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
    </div>
  );
}
