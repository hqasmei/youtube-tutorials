import { ReactNode } from 'react';

export default function MaxWidthWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-screen-lg md:px-2.5">{children}</div>
  );
}
