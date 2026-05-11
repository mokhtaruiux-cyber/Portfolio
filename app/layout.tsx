import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

import '../index.css';

import { MotionProvider } from '../components/providers/MotionProvider';
import { LenisProvider } from '../components/providers/SmoothScrollProvider';
import { PortfolioApp } from '../components/PortfolioApp';
import { buildNextMetadata, buildRuntimeSeo, DEFAULT_SITE_URL, resolveSiteUrl } from '../lib/seo';

const siteUrl = resolveSiteUrl();
const defaultSeo = buildRuntimeSeo({ currentPage: 'home', path: '/' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || DEFAULT_SITE_URL),
  ...buildNextMetadata(defaultSeo, { siteUrl }),
  icons: {
    icon: [{ url: '/assets/images/Logo@4x.webp', type: 'image/webp' }],
    apple: [{ url: '/assets/images/Logo@4x.webp' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="dark overflow-x-hidden" suppressHydrationWarning>
        <LenisProvider>
          <MotionProvider>
            <PortfolioApp />
            {children}
          </MotionProvider>
        </LenisProvider>
        <Script
          id="cal-embed"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function (C, A, L) {
                var p = function (a, ar) { a.q.push(ar); };
                var d = C.document;
                C.Cal = C.Cal || function () {
                  var cal = C.Cal;
                  var ar = arguments;
                  if (!cal.loaded) {
                    cal.ns = {};
                    cal.q = cal.q || [];
                    d.head.appendChild(d.createElement("script")).src = A;
                    cal.loaded = true;
                  }
                  if (ar[0] === L) {
                    var api = function () { p(api, arguments); };
                    var namespace = ar[1];
                    api.q = api.q || [];
                    if (typeof namespace === "string") {
                      cal.ns[namespace] = cal.ns[namespace] || api;
                      p(cal.ns[namespace], ar);
                      p(cal, ["initNamespace", namespace]);
                    } else p(cal, ar);
                    return;
                  }
                  p(cal, ar);
                };
              })(window, "https://app.cal.com/embed/embed.js", "init");

              Cal("init", "book-call", { origin: "https://cal.com" });
              Cal("preload", { calLink: "mohammed-mokhtar/30min" });
              Cal.ns["book-call"]("ui", { layout: "month_view" });
            `,
          }}
        />
      </body>
    </html>
  );
}
