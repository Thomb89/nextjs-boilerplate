import { Key, useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export type tab = {
  label: string;
  key: Key;
};

export type TabsProps = {
  className?: string;
  tabs: tab[];
  activeTabChanged: (key: Key) => void;
  activeTab: Key;
};

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTabChanged, activeTab, className }) => {
  const [tabIsScrollable, setTabIsScrollable] = useState<boolean>(false);

  const listRef = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    if (!listRef.current) return;

    setTabIsScrollable(listRef.current.scrollWidth > listRef.current.clientWidth);
  }, [listRef, tabs]);

  return (
    <div className="flex items-center  border-b border-secondary-500 shadow-md">
      {tabIsScrollable && (
        <div onClick={() => listRef.current?.scrollBy({ behavior: 'smooth', left: -200 })} data-testid="tab-scroll-left">
          <ChevronLeftIcon className="h-full w-8" />
        </div>
      )}
      <ul className={`flex overflow-auto overflow-x-hidden ${className}`} ref={listRef} data-testid="tab-list">
        {tabs.map((tab) => (
          <li
            className={`px-10 py-3 box-border transition-all duration-300 ease-in cursor-pointer uppercase border-b-2 ${
              activeTab === tab.key ? 'border-primary-500' : 'border-transparent'
            } hover:border-secondary-500`}
            key={tab.key}
            onClick={() => {
              if (activeTab !== tab.key) {
                activeTabChanged(tab.key);
              }
            }}
            data-testid="tab">
            {tab.label}
          </li>
        ))}
      </ul>
      {tabIsScrollable && (
        <div onClick={() => listRef.current?.scrollBy({ behavior: 'smooth', left: 200 })} data-testid="tab-scroll-right">
          <ChevronRightIcon className="h-full w-8" />
        </div>
      )}
    </div>
  );
};
