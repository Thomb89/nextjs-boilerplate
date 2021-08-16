import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from './index';

// ====================================================================================
// TOAST RFC
// ====================================================================================
//#region TOAST RFC

export type type = {
  icon: JSX.Element;
  iconClassName: string;
  borderClassName: string;
  closeIcon: JSX.Element;
  buttonClassName: string;
  noIcon: JSX.Element;
  yesIcon: JSX.Element;
};
export type toastTypes = {
  success?: Partial<type>;
  info?: Partial<type>;
  warning?: Partial<type>;
  error?: Partial<type>;
};

export type ToastProps = {
  type?: type;
  className?: string;
  messageButtonsWrapperClassName?: string;
  closeButton?: boolean;
  toast: toast;
  removeToast: () => void;
  animation: {
    startClassName: string;
    endClassName: string;
    animationClassName: string;
    duration: number;
  };
};

/**
 * A React FC to display a Toast-Notification
 */
export const Toast: React.FC<ToastProps> = ({ type, className, toast, removeToast, animation, closeButton, messageButtonsWrapperClassName }) => {
  const [animationState, setAnimationState] = useState<string>(animation.startClassName);

  const close = useCallback(() => {
    toast.buttons?.onClose?.();
    removeToast();
  }, [removeToast, toast.buttons]);

  useEffect(() => {
    setAnimationState(animation.endClassName);

    if (toast.autoClose === false) return;

    const animationTimeout = setTimeout(() => {
      setAnimationState(animation.startClassName);
    }, toast.duration! - animation.duration);

    const timeout = setTimeout(() => {
      if (toast.buttons?.messageResult) toast.buttons.messageResult('no');
      close();
    }, toast.duration);

    return () => {
      clearTimeout(animationTimeout);
      clearTimeout(timeout);
    };
  }, []);

  const displayCloseButton = useMemo(() => {
    let displayCloseButton = true;
    if (closeButton !== undefined) displayCloseButton = closeButton;
    if (toast.buttons?.closeButton !== undefined) displayCloseButton = toast.buttons.closeButton;
    if (toast.buttons?.messageResult) displayCloseButton = false;

    return displayCloseButton;
  }, [closeButton, toast]);

  return (
    <div
      className={`${
        className ??
        `inline-flex gap-2 justify-between items-center box-border w-full m-1 p-4 bg-gray-800 rounded border-l-8 ${type?.borderClassName}`
      } ${animation.animationClassName} ${animationState}`}>
      <div className={`${type?.iconClassName ?? ''}`}>{type?.icon}</div>
      <div style={{ width: '100%' }}>{toast.content}</div>
      {displayCloseButton && (
        <div>
          <button onClick={close} className={type?.buttonClassName ?? ''}>
            {type?.closeIcon}
          </button>
        </div>
      )}
      {toast.buttons?.messageResult && (
        <div className={`${messageButtonsWrapperClassName} ?? inline-flex gap-2`}>
          <button
            onClick={() => {
              toast.buttons?.messageResult?.('yes');
              close();
            }}
            className={type?.buttonClassName ?? ''}>
            {type?.yesIcon}
          </button>
          <button
            onClick={() => {
              toast.buttons?.messageResult?.('no');
              close();
            }}
            className={type?.buttonClassName ?? ''}>
            {type?.noIcon}
          </button>
        </div>
      )}
    </div>
  );
};

//#endregion
