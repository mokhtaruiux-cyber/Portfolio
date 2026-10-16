import React from 'react';
import { Project } from '../../types';
import { Reveal } from './Reveal';

interface StackedCardsProps {
  items: Project[];
  renderItem: (item: Project, index: number) => React.ReactNode;
}

export const StackedCards: React.FC<StackedCardsProps> = ({
  items,
  renderItem,
}) => {
  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">
      {items.map((item, index) => (
        <Reveal key={item.id || index} preset="card" className="w-full">
          {renderItem(item, index)}
        </Reveal>
      ))}
    </div>
  );
};
