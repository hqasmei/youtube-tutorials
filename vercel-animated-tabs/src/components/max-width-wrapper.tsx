import React, { ReactNode } from 'react';

const MaxWidthWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
