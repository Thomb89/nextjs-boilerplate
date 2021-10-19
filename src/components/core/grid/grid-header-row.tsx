import { Fragment } from 'react';

export type GridHeaderRowProps = {
  headerRowText: string[];
  className?: string;
};

export const GridHeaderRow: React.FC<GridHeaderRowProps> = ({ headerRowText, className }) => {
  return (
    <Fragment>
      <h4 className={`col-start-1 bg-primary-500 dark:bg-primary-600 bg-opacity-30 dark:bg-opacity-30 ${className ?? ''}`}></h4>
      {headerRowText.map((text, index) => (
        <h4
          key={index}
          className={`font-normal bg-primary-500 dark:bg-primary-600 bg-opacity-30 dark:bg-opacity-30 ${
            index === 0
              ? 'col-start-2'
              : index === 1
              ? 'col-start-3'
              : index === 2
              ? 'col-start-4'
              : index === 3
              ? 'col-start-5'
              : index === 4
              ? 'col-start-6'
              : index === 5
              ? 'col-start-7'
              : index === 6
              ? 'col-start-8'
              : index === 7
              ? 'col-start-9'
              : index === 8
              ? 'colstart-10'
              : index === 9
              ? 'col-start-11'
              : 'col-start-12'
          } hidden md:flex justify-end ${className ?? ''}`}>
          {text}
        </h4>
      ))}
    </Fragment>
  );
};
