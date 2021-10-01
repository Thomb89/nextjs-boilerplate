import { useEffect, useState } from 'react';
import { theme } from '../../tailwind.config';

type breakpoint = 'xs' | keyof typeof theme.extend.screens;
const breakpoints: Record<Exclude<breakpoint, 'xs'>, string> = theme.extend.screens;

export const useGetCurrentTailwindCssBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<breakpoint>('xs');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeout: NodeJS.Timeout = undefined;

    const checkBreakpoints = () => {
      let newBreakpoint: breakpoint = 'xs';

      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        for (const breakpoint in breakpoints) {
          const matches = window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`).matches;
          if (matches) newBreakpoint = breakpoint as breakpoint;
        }

        setCurrentBreakpoint(newBreakpoint);
      }, 250);
    };

    window.addEventListener('resize', checkBreakpoints);

    return () => window.removeEventListener('resize', checkBreakpoints);
  }, []);

  return currentBreakpoint;
};
