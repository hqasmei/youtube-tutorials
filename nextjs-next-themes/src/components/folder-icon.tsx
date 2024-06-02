'use client';

import React, { useEffect, useRef, useState } from 'react';

import { useLottie, useLottieInteractivity } from 'lottie-react';

import animationData from '../../public/animations/folders.json';
import { FoldersIcon } from './icons/folders';

export const FolderIcon: React.FC = () => {
  const options = {
    animationData: animationData,
    loop: false,
    autoplay: false, // Ensures the animation doesn't play automatically
  };

  const lottieObj = useLottie(options);

  // Enhance the Lottie animation with interactivity
  const InteractiveAnimation = useLottieInteractivity({
    lottieObj,
    mode: 'cursor', // Play animation on hover
    actions: [
      {
        position: { x: [0, 1], y: [-1, 2] },
        type: 'seek',
        frames: [30, 50],
      },
      {
        position: { x: -1, y: -1 },
        type: 'stop',
        frames: [0],
      },
    ],
  });

  return <div>{InteractiveAnimation}</div>;
};
