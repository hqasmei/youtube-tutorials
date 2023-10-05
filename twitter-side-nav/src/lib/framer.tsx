import React, { useEffect, useRef, useState } from 'react';

import { Tab } from '@/hook/use-tabs';
import classNames from 'classnames';
import { motion } from 'framer-motion';

const transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.15,
};

type Props = {
  selectedTabIndex: number;
  tabs: Tab[];
  setSelectedTab: (input: [number, number]) => void;
};

const Tabs = ({
  tabs,
  selectedTabIndex,
  setSelectedTab,
}: Props): JSX.Element => {
  const [buttonRefs, setButtonRefs] = useState<Array<HTMLButtonElement | null>>(
    [],
  );

  useEffect(() => {
    setButtonRefs((prev) => prev.slice(0, tabs.length));
  }, [tabs.length]);

  const navRef = useRef<HTMLDivElement>(null);
  // const navRect = navRef.current?.getBoundingClientRect();

  // const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect();
  const [selectedRect, setSelectedRect] = useState<DOMRect | null>(null);
  const [navRect, setNavRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const updateRects = () => {
      const newSelectedRect =
        buttonRefs[selectedTabIndex]?.getBoundingClientRect() || null;
      const newNavRect = navRef.current?.getBoundingClientRect() || null;
      setSelectedRect(newSelectedRect);
      setNavRect(newNavRect);
    };

    updateRects();

    window.addEventListener('resize', updateRects);

    return () => {
      window.removeEventListener('resize', updateRects);
    };
  }, [buttonRefs, selectedTabIndex]);

  return (
    <nav
      ref={navRef}
      className="flex flex-shrink-0 justify-center items-center relative z-0 w-full "
    >
      {tabs.map((item, i) => {
        const isActive = selectedTabIndex === i;

        return (
          <button
            key={i}
            className={classNames(
              'text-lg relative flex items-center h-10 px-4 z-20 bg-transparent  cursor-pointer select-none transition-colors w-full justify-center hover:bg-white/10 duration-200 py-8',
              {
                'text-white/60': !isActive, // Default color for non-active tabs
                'text-white/90 font-bold': isActive, // Color for active tabs
              },
            )}
            ref={(el) => (buttonRefs[i] = el)}
            onClick={() => {
              setSelectedTab([i, i > selectedTabIndex ? 1 : -1]);
            }}
          >
            {item.label}
          </button>
        );
      })}

      {selectedRect && navRect && (
        <motion.div
          className={
            'absolute z-10 bottom-0 left-0.5 h-[5px] bg-sky-500 dark:bg-sky-500 rounded-full'
          }
          initial={false}
          animate={{
            width: selectedRect.width * 0.2,
            x: `calc(${selectedRect.left - navRect.left}px + 195%)`,
            opacity: 1,
          }}
          transition={transition}
        />
      )}
    </nav>
  );
};

export const Framer = { Tabs };
