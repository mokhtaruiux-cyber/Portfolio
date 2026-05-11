'use client';

import React from 'react';
import { MotionConfig } from 'motion/react';

import { transitions } from '../../lib/motionTokens';

export const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <MotionConfig reducedMotion="user" transition={transitions.smooth}>
    {children}
  </MotionConfig>
);
