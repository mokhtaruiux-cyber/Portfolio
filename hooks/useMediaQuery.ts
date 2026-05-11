import { useEffect, useState } from 'react';

/**
 * Shared media query hook to avoid duplicate matchMedia listeners across components.
 * @param query - Media query string, e.g., '(min-width: 768px)'
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const media = window.matchMedia(query);
        const update = () => setMatches(media.matches);

        // Set initial value
        update();

        // Listen for changes (Safari/WebView fallback)
        if (media.addEventListener) {
            media.addEventListener('change', update);
            return () => media.removeEventListener('change', update);
        }
        media.addListener(update);
        return () => media.removeListener(update);
    }, [query]);

    return matches;
}

/**
 * Check if device can hover (desktop with mouse)
 */
export function useCanHover(): boolean {
    return useMediaQuery('(hover: hover) and (pointer: fine)');
}

/**
 * Check if viewport is at least tablet size
 */
export function useIsDesktop(): boolean {
    return useMediaQuery('(min-width: 768px)');
}
