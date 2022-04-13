import { ArrowSmRightIcon, TrendingDownIcon, TrendingUpIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';

type content = {
  headerId: string;
  value: string | number | JSX.Element;
  className?: string;
};

export type GridRowProps = {
  label: string;
  content: content[];
  className?: string;
  isEven?: boolean;
  nesting?: 1 | 2 | 3;
  bold?: boolean;
  newSection?: boolean;
  divider?: boolean;
};

export const GridRow: React.FC<GridRowProps> = ({ label, content, isEven, newSection, className, nesting, bold, divider }) => {
  const background = isEven ? 'bg-gray-600 bg-opacity-10 dark:bg-opacity-30' : '';

  return (
    <Fragment key={label}>
      <h4
        className={`md:py-1 px-2 flex items-center gap-2 
        ${bold ? '' : 'font-normal'} 
        ${background} 
        ${nesting > 1 ? 'text-primary-600 dark:text-primary-200' : ''} 
        ${nesting === 2 ? 'pl-6' : ''} ${nesting === 3 ? 'pl-10' : ''} 
        ${divider ? 'border-t-2 border-primary-500' : ''} 
        ${newSection ? 'mt-8' : ''} ${className ?? ''}
        ${content.length === 0 ? 'col-span-full' : 'col-start-1 col-span-2 md:col-span-1'}`}>
        {nesting && <ArrowSmRightIcon />}
        {label}
      </h4>
      {content.map((entity) => (
        <Fragment key={`${entity.headerId}  ${entity.value}`}>
          <div className={`md:hidden text-gray-500 dark:text-gray-400 font-mono md:py-1 px-2 flex items-center justify-end ${background}`}>
            {entity.headerId}
          </div>
          <div
            className={`font-mono md:py-1 px-2 flex gap-x-1 items-center justify-end 
            ${background} 
            ${divider ? 'md:border-t-2 border-primary-500' : ''} 
            ${newSection ? 'md:mt-8' : ''} ${entity.className ?? ''}`}>
            {entity.value}
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};
