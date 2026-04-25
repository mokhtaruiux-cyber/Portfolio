import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';
import { typography } from '../../lib/typography';
import { transitions } from '../../lib/motionTokens';

export interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: string;
  target?: string;
  rel?: string;
  calLink?: string;
  calNamespace?: string;
  calConfig?: string;
  type?: 'button' | 'submit' | 'reset';
  as?: 'button' | 'a' | 'span';
  size?: 'default' | 'cta';
  fullWidth?: boolean;
  glow?: boolean;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  target,
  rel,
  calLink,
  calNamespace,
  calConfig,
  type = 'button',
  as,
  size = 'default',
  fullWidth = false,
  glow = true,
}) => {
  const { darkMode } = useTheme();
  const isCalLink = Boolean(calLink);
  const Element = as ?? (isCalLink ? 'button' : href ? 'a' : 'button');
  const elementProps = Element === 'a' ? { href, target, rel } : Element === 'button' ? { type } : {};
  const calProps = calLink && Element === 'button'
    ? {
        'data-cal-link': calLink,
        ...(calNamespace ? { 'data-cal-namespace': calNamespace } : {}),
        ...(calConfig ? { 'data-cal-config': calConfig } : {}),
      }
    : {};

  if (!glow) {
    return (
      <div className={cn(fullWidth && 'w-full', !darkMode && 'light-glow-button', className)}>
        <Element
          {...elementProps}
          {...calProps}
          className={cn(
            'glow-button-inner group w-full items-center justify-center transition-all duration-300 active:scale-[0.98]',
            size === 'cta' ? 'h-12 !py-0 !px-4 sm:!px-6' : 'px-8 py-4 sm:px-10 sm:py-5'
          )}
          onClick={onClick}
        >
          <motion.span
            className={cn('flex items-center justify-center gap-3', typography.button)}
            whileHover={{ x: 1 }}
            transition={transitions.quick}
          >
            {children}
          </motion.span>
        </Element>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'glow-border-container',
        !darkMode && 'light-glow-button',
        fullWidth ? 'w-full flex' : 'inline-flex',
        className
      )}
    >
      <div className="glow-border-bg"></div>
      <Element
        {...elementProps}
        {...calProps}
        className={cn(
          'glow-button-inner group w-full items-center justify-center transition-all duration-300 active:scale-[0.98]',
          size === 'cta' ? 'h-12 !py-0 !px-4 sm:!px-6' : 'px-8 py-4 sm:px-10 sm:py-5'
        )}
        onClick={onClick}
      >
        <motion.span
          className={cn('flex items-center justify-center gap-3', typography.button)}
          whileHover={{ x: 1 }}
          transition={transitions.quick}
        >
          {children}
        </motion.span>
      </Element>
    </div>
  );
};
