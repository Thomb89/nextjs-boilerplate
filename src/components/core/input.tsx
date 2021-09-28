import { ForwardedRef } from 'react';
import { forwardRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

type inputType = 'password' | 'number' | 'checkbox' | 'text' | 'select';

export type InputProps = {
  'data-testid'?: string;
  classNames?: {
    fieldSet?: string;
    input?: string;
    label?: string;
  };
  error?: boolean;
  onChange?: (event: any) => Promise<void | boolean>;
  onBlur?: (event: any) => Promise<void | boolean>;
  checked?: boolean;
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
  children?: JSX.Element[];
};

export const Input = forwardRef<HTMLSelectElement | HTMLInputElement | null, InputProps>(
  ({ name, error, onBlur, onChange, readOnly, step, type, validation, label, classNames, children, ...props }, inputRef) => {
    const [inputType, setInputType] = useState<inputType>(type ?? 'text');

    const errorClass = error ? 'text-red-600 border-red-600' : '';

    const passwordButtons = (
      <div className="w-16 flex justify-center items-center bg-gray-600 rounded-r-lg text-primary-200">
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

    const inputElement = (
      <input
        id={name}
        name={name}
        placeholder={label}
        type={inputType}
        step={step}
        ref={inputRef as ForwardedRef<HTMLInputElement | null>}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        className={`${type === 'password' ? 'rounded-r-none' : ''} ${classNames?.input ?? ''} ${errorClass}`}
        {...validation}
        {...props}
      />
    );
    const labelElement = (
      <label htmlFor={name} className={`dark:text-gray-300 ${classNames?.label ?? ''} ${errorClass}`}>
        {label}
      </label>
    );

    if (type === 'select')
      return (
        <fieldset className={`flex flex-col ${classNames?.input ?? ''}`}>
          {labelElement}
          <select
            id={name}
            name={name}
            defaultValue={'-'}
            ref={inputRef as ForwardedRef<HTMLSelectElement | null>}
            onChange={onChange}
            onBlur={onBlur}
            className={`${classNames?.input ?? ''} ${errorClass}`}
            {...props}>
            <option value="-" disabled>
              -
            </option>
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

Input.displayName = 'Input';
