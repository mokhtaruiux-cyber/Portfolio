import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { PageKey } from '../../types';
import { cn } from '../../lib/utils';
import { typography } from '../../lib/typography';
import { Container } from './Container';
import { GlowButton } from '../ui/GlowButton';

interface NavbarProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
}

export const Navbar = ({ currentPage, onNavigate }: NavbarProps) => {
  const { darkMode, setDarkMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const bodyOverflowRef = useRef<string>('');
  const menuId = 'mobile-menu';

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', s);
    return () => window.removeEventListener('scroll', s);
  }, []);

  useEffect(() => {
    if (currentPage !== 'home' || !pendingSection) return;
    requestAnimationFrame(() => {
      document.getElementById(pendingSection)?.scrollIntoView({ behavior: 'smooth' });
      setPendingSection(null);
    });
  }, [currentPage, pendingSection]);

  useEffect(() => {
    if (!isMenuOpen) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    bodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusable = menuPanelRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const focusableItems = Array.from(focusable ?? []);
    focusableItems[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab' || focusableItems.length === 0) return;
      const first = focusableItems[0];
      const last = focusableItems[focusableItems.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = bodyOverflowRef.current;
      previousFocusRef.current?.focus();
    };
  }, [isMenuOpen]);

  const navItems = siteContent.nav.items;

  const handleNavClick = (item: (typeof navItems)[number]) => {
    const sectionId = item.sectionId;
    if (sectionId) {
      if (currentPage !== 'home') {
        setPendingSection(sectionId);
        onNavigate('home');
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
      return;
    }
    if (item.page) {
      onNavigate(item.page);
    }
    setIsMenuOpen(false);
  };

  const isActive = (page: PageKey) => {
    if (page === 'work') return currentPage === 'work' || currentPage === 'project-details';
    if (page === 'blog') return currentPage === 'blog' || currentPage === 'blog-details';
    return currentPage === page;
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-nav pt-6">
      <Container>
        <motion.div
          className={cn(
            'relative w-full h-20 rounded-[16px] glass border shadow-xl overflow-hidden',
            scrolled && 'shadow-2xl',
            darkMode ? 'bg-black/60 border-white/10' : 'bg-white/70 border-black/10'
          )}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between h-full px-4 sm:px-6">
            <Link
              to="/"
              className={cn(
                'flex items-center gap-3 cursor-pointer bg-transparent no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2',
                darkMode ? 'focus-visible:ring-offset-[#030303]' : 'focus-visible:ring-offset-[#fafafa]'
              )}
            >
              <div className="h-10 w-10 flex items-center justify-center">
                <img src={siteContent.brand.logoSrc} alt={siteContent.brand.logoAlt} className="w-full h-full object-contain" />
              </div>
              <span className={cn(typography.brand, darkMode ? 'text-white' : 'text-black')}>{siteContent.brand.name}</span>
            </Link>
            <div className="hidden md:flex flex-1 items-center justify-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    typography.labelSm,
                    'transition-colors',
                    item.page && isActive(item.page) ? 'text-blue-500' : darkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <GlowButton
                href={siteContent.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex"
                size="cta"
              >
                {siteContent.hero.ctaPrimary}
              </GlowButton>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={cn(
                  typography.navControl,
                  'rounded-[4px] border border-white/35 text-white/90 flex items-center justify-center hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
                  !darkMode && 'border-black/10 text-black'
                )}
                aria-label={siteContent.nav.toggleThemeLabel}
              >
                {darkMode ? <Sun className={typography.navIcon} /> : <Moon className={typography.navIcon} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  typography.navControl,
                  'rounded-[4px] border border-white/35 text-white/90 flex items-center justify-center hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 md:hidden',
                  !darkMode && 'border-black/10 text-black'
                )}
                aria-label={siteContent.nav.openMenuLabel}
                aria-controls={menuId}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className={typography.navIcon} /> : <Menu className={typography.navIcon} />}
              </button>
            </div>
          </div>
        </motion.div>
      </Container>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-overlay md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <Container className="relative pt-24">
              <motion.div
                id={menuId}
                ref={menuPanelRef}
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                className={cn(
                  'w-full rounded-[16px] glass border p-6 flex flex-col items-center gap-6 shadow-2xl',
                  darkMode ? 'bg-black/95 border-white/10 text-white' : 'bg-white/95 border-black/10 text-black'
                )}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile menu"
              >
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className={cn(
                      typography.menuItem,
                      'transition-all w-full text-center',
                      item.page && isActive(item.page) ? 'opacity-100 text-blue-500' : typography.textMuted
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="w-full h-px bg-current opacity-10" />
                <GlowButton
                  href={siteContent.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="cta"
                  fullWidth
                  className="w-full"
                >
                  {siteContent.hero.ctaPrimary}
                </GlowButton>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
