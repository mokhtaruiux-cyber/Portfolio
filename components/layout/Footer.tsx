import React, { useEffect, useState } from 'react';
import { siteContent } from '../../content';
import { PageKey } from '../../types';
import { Container } from './Container';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';

type FooterNavLink = (typeof siteContent.footer.columns)[number]['links'][number];

export const Footer = ({
  currentPage,
  onNavigate,
}: {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
}) => {
  const { darkMode } = useTheme();
  const footerColumns = siteContent.footer.columns;
  const { cal } = siteContent;
  const [pendingSection, setPendingSection] = useState<string | null>(null);

  useEffect(() => {
    if (currentPage !== 'home' || !pendingSection) return;
    requestAnimationFrame(() => {
      document.getElementById(pendingSection)?.scrollIntoView({ behavior: 'smooth' });
      setPendingSection(null);
    });
  }, [currentPage, pendingSection]);

  const handleFooterNavigation = (link: FooterNavLink) => {
    if (link.sectionId) {
      if (currentPage !== 'home') {
        setPendingSection(link.sectionId);
        onNavigate('home');
      } else {
        document.getElementById(link.sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    if (link.page) {
      onNavigate(link.page);
    }
  };

  return (
    <footer className={cn('pt-24 pb-12 sm:pt-48 border-t border-white/5 relative z-10', darkMode ? 'bg-[#030303]' : 'bg-[#fafafa]')}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
          <div className="lg:col-span-2 text-left">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 flex items-center justify-center">
                <img src={siteContent.brand.logoSrc} alt={siteContent.brand.logoAlt} className="w-full h-full object-contain" />
              </div>
              <span className={cn(typography.h3, 'font-black tracking-tighter', darkMode ? 'text-white' : 'text-black')}>
                {siteContent.brand.name}
              </span>
            </div>
            <p className={cn(typography.body, typography.textMuted, 'max-w-sm')}>{siteContent.footer.tagline}</p>
          </div>
          {footerColumns.map((column) => (
            <div key={column.title} className="text-left">
              <h5 className={cn(typography.labelXs, 'tracking-[0.3em] mb-8 text-accent')}>{column.title}</h5>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      link.href === siteContent.bookingUrl ? (
                        <button
                          type="button"
                          data-cal-link={cal.link}
                          data-cal-namespace={cal.namespace}
                          data-cal-config={cal.configJson}
                          className={cn(typography.body, typography.textMuted, 'hover:opacity-100 transition-opacity font-semibold')}
                        >
                          {link.label}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(typography.body, typography.textMuted, 'hover:opacity-100 transition-opacity font-semibold')}
                        >
                          {link.label}
                        </a>
                      )
                    ) : link.sectionId || link.page ? (
                      <button
                        type="button"
                        onClick={() => handleFooterNavigation(link)}
                        className={cn(typography.body, typography.textMuted, 'hover:opacity-100 transition-opacity font-semibold')}
                      >
                        {link.label}
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={cn('flex flex-col sm:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6', typography.labelSm, typography.textMuted)}>
          <span>{siteContent.footer.copyright}</span>
        </div>
      </Container>
    </footer>
  );
};
