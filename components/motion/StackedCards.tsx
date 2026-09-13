import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Project } from '../../types';
import { cardReveal } from '../../lib/motion/motionPresets';
import { reveal } from '../../lib/motion/presets';

interface StackedCardsProps {
  items: Project[];
  renderItem: (item: Project, index: number) => React.ReactNode;
  orchestrated?: boolean;
}

export const StackedCards: React.FC<StackedCardsProps> = ({
  items,
  renderItem,
  orchestrated = false,
}) => {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">
      {items.map((item, index) => (
        <motion.div
          key={item.id || index}
          className="w-full"
          {...(orchestrated
            ? reveal.card
            : {
                custom: index,
                variants: cardReveal.variants({ reduceMotion }),
                initial: 'initial' as const,
                whileInView: 'animate' as const,
                viewport: cardReveal.viewport,
              })}
        >
          {renderItem(item, index)}
        </motion.div>
      ))}
    </div>
  );
};
