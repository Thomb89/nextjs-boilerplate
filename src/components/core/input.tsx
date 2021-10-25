import { ForwardedRef, MutableRefObject, useImperativeHandle, useMemo, useRef } from 'react';
import { forwardRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { SearchIcon, XIcon } from '@heroicons/react/solid';

type inputType = 'password' | 'number' | 'checkbox' | 'text' | 'select' | 'search';

export type InputProps = {
  'data-testid'?: string;
  classNames?: {
    fieldSet?: string;
    input?: string;
    label?: string;
  };
  error?: boolean;
  onChange?: (event: any) => Promise<void | boolean> | (void | boolean);
  onBlur?: (event: any) => Promise<void | boolean> | (void | boolean);
  onFocus?: (event: any) => Promise<void | boolean> | (void | boolean);
  checked?: boolean; // checkbox
  multiple?: boolean; // select
  name: string;
  type?: inputType;
  step?: number;
  readOnly?: boolean;
  validation?: {
    required?: boolean;
    minlength?: number;
    maxlength?: number;
    min?: number;
    max?: number;
    pattern?: string;
  };
  label: string;
  children?: JSX.Element[] | JSX.Element;
};

export const Input = forwardRef<HTMLSelectElement | HTMLInputElement | null, InputProps>(
  ({ name, error, onBlur, onFocus, onChange, readOnly, step, type, validation, label, classNames, children, ...props }, inputRef) => {
    const [inputType, setInputType] = useState<inputType>(type !== 'search' ? type : 'text' ?? 'text');

    const innerRef = useRef<HTMLSelectElement | HTMLInputElement | null>(null);
    useImperativeHandle(inputRef, () => innerRef.current, []);

    const errorClass = error ? 'text-red-600 border-red-600' : '';

    const passwordButtons = (
      <div className="w-16 flex justify-center items-center bg-gray-600 rounded-r-lg text-primary-200 flex-shrink-0">
        {inputType === type ? (
          <div
            onClick={() => setInputType('text')}
            className="hover:cursor-pointer hover:animate-pulse w-full h-full flex justify-center items-center">
            <EyeIcon />
          </div>
        ) : (
          <div
            onClick={() => setInputType('password')}
            className="hover:cursor-pointer hover:animate-pulse w-full h-full flex justify-center items-center">
            <EyeOffIcon />
          </div>
        )}
      </div>
    );

    const searchButtons = (
      <div className="text-primary-200 flex items-center justify-center w-16 bg-gray-600 rounded-r-lg flex-shrink-0">
        {(innerRef as MutableRefObject<HTMLInputElement | null>).current?.value?.length === 0 ? (
          <SearchIcon />
        ) : (
          <div
            className="cursor-pointer w-full h-full flex items-center justify-center"
            onClick={() => {
              innerRef.current.value = '';
              onChange('');
            }}
            data-testid="user-search-clear">
            <XIcon />
          </div>
        )}
      </div>
    );

    const inputElement = (
      <input
        id={name}
        name={name}
        placeholder={label}
        type={inputType}
        step={step}
        ref={innerRef as ForwardedRef<HTMLInputElement | null>}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        readOnly={readOnly}
        autoComplete={type === 'search' || type === 'password' ? 'off' : undefined}
        className={`${type === 'password' || type === 'search' ? 'rounded-r-none' : ''} 
        ${classNames?.input ?? ''} ${errorClass}`}
        {...validation}
        {...props}
      />
    );
    const labelElement = (
      <label htmlFor={name} className={`dark:text-gray-300 ${classNames?.label ?? ''} ${errorClass}`}>
        {label}
      </label>
    );

    if (type === 'search')
      return (
        <fieldset className="flex w-full">
          <div className="overflow-hidden">{inputElement}</div>
          {searchButtons}
        </fieldset>
      );

    if (type === 'select')
      return (
        <fieldset className={`flex flex-col ${classNames?.input ?? ''}`}>
          {labelElement}
          <select
            id={name}
            name={name}
            defaultValue={'-'}
            ref={innerRef as ForwardedRef<HTMLSelectElement | null>}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            className={`${classNames?.input ?? ''} ${errorClass}`}
            {...props}>
            {children}
          </select>
        </fieldset>
      );

    if (type === 'checkbox')
      return (
        <fieldset className={`flex gap-2 ${classNames?.input ?? ''}`}>
          {inputElement}
          {labelElement}
        </fieldset>
      );

    return (
      <fieldset className={`flex flex-col items-start  ${classNames?.fieldSet ?? ''}`}>
        {labelElement}
        <div className={`inline-flex w-full relative`}>
          {inputElement}
          {type === 'password' && passwordButtons}
        </div>
      </fieldset>
    );
  }
);

Input['displayName'] = 'Input';
