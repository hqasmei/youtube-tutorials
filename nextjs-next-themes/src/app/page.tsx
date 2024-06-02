import React from 'react';

import { FolderIcon } from '@/components/folder-icon';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  space-y-10 p-24">
      <div className="flex flex-row  max-w-xs w-full items-center justify-center">
        <ThemeToggle />
        {/* <ThemeToggle isDropDown={true} /> */}
      </div>
      <div className="max-w-2xl rounded-lg border bg-neutral-100/70 dark:bg-neutral-900/70 p-24 items-center flex">
        <span className="text-2xl font-medium  text-neutral-600 dark:text-neutral-400">
          Hello world!
        </span>
      </div>
      <div>
        <FolderIcon />
      </div>
    </main>
  );
}
