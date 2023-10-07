import React from 'react';

import MaxWidthWrapper from './max-width-wrapper';

const Integrations = () => {
  return (
    <div className="flex flex-col h-screen">
      <MaxWidthWrapper>
        <span className="text-4xl mx-auto px-4">Integrations</span>
      </MaxWidthWrapper>

      <div className="px-4 w-full border-t mt-10 border-zinc-800 flex">
        <MaxWidthWrapper>
          <div className="bg-zinc-950  mt-8 border border-zinc-800 rounded-lg h-[800px]"></div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default Integrations;
