import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setIsDark } from '../store/base';

export type MenuBarProps = {};

export const MenuBar: React.FC<MenuBarProps> = ({}) => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.base.isDark);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    dispatch(setIsDark(document.getElementById('html').className.includes('dark')));
  }, [dispatch]);

  const changeColorMode = useCallback(async () => {
    const html = document.getElementById('html');

    if (html.className.includes('dark')) {
      html.className = '';
      dispatch(setIsDark(false));
    } else {
      html.className = 'dark';
      dispatch(setIsDark(true));
    }
  }, [dispatch]);

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
