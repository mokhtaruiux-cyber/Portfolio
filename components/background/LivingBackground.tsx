import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/** Static atmosphere keeps the page depth without a permanent blurred animation. */
export const LivingBackground = () => {
  const { darkMode } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse at 20% 12%, rgba(47, 107, 255, 0.17), transparent 50%), radial-gradient(ellipse at 82% 72%, rgba(168, 85, 247, 0.08), transparent 55%)'
            : 'radial-gradient(ellipse at 20% 12%, rgba(47, 107, 255, 0.1), transparent 50%), radial-gradient(ellipse at 82% 72%, rgba(168, 85, 247, 0.05), transparent 55%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(#000 1.2px, transparent 1.2px), linear-gradient(90deg, #000 1.2px, transparent 1.2px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className={darkMode
          ? 'absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,3,0.7)_100%)]'
          : 'absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(250,250,250,0.7)_100%)]'}
      />
    </div>
  );
};
