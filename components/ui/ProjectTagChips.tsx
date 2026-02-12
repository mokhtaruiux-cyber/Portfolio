import React from 'react';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';

type ProjectTagChipsProps = {
  tags: string[];
  className?: string;
};

export const ProjectTagChips: React.FC<ProjectTagChipsProps> = ({ tags, className }) => {
  if (tags.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap gap-2', typography.labelXs, className)}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 rounded-mini border border-accent/20 text-accent"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
