import { useReactiveVar } from '@apollo/client';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useCallback, useEffect } from 'react';
import { isDarkMode } from '../graphql/client';

export type MenuBarProps = {};

export const MenuBar: React.FC<MenuBarProps> = ({}) => {
  const isDark = useReactiveVar(isDarkMode);
  useEffect(() => {
    if (typeof window === 'undefined') return;

    isDarkMode(document.getElementById('html').className.includes('dark'));
  }, []);

  const changeColorMode = useCallback(async () => {
    const html = document.getElementById('html');

    if (html.className.includes('dark')) {
      html.className = '';
      isDarkMode(false);
    } else {
      html.className = 'dark';
      isDarkMode(true);
    }
  }, []);

  return (
    <div className="fixed h-16 z-40 bg-secondary-900 inset-0 px-4 border-b border-secondary-500 flex justify-end sm:justify-between items-center">
      <Link href="/" passHref>
        <h1 className="cursor-pointer text-primary-400 dark:text-primary-400 font-serif hidden sm:block">Company Name</h1>
      </Link>
      <button
        onClick={changeColorMode}
        className="border-primary-400 text-primary-400 border-opacity-30 hover:border-opacity-30 hover:text-primary-500 hover:border-primary-500">
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
};
