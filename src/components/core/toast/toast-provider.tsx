import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon, XIcon, CheckIcon } from '@heroicons/react/solid';
import React, { Reducer, useEffect, useMemo, useReducer, useState } from 'react';
import { createPortal } from 'react-dom';

import { Provider, toastState } from './context';
import { Toast, ToastProps, toastTypes, type } from './toast';
import { toast, toastId } from './index';

// ====================================================================================
// TOASTPROVIDER RFC
// ====================================================================================
//#region TOASTPROVIDER RFC

export type windowWithToast = Window & typeof globalThis & { addToast?: (toast: toast) => void; removeToast?: (toastId: toastId) => void };

export type contextReducer = Reducer<toastState, { type: 'addOrUpdateToast' | 'removeToast'; payload: any }>;

export type ToastProviderProps = {
  maxDisplay: number;
  duration?: number;
  autoClose?: boolean;
  className?: string;
  toastOptions?: ToastProps;
  types?: toastTypes;
  onHasToasts?: () => void;
  onHsNoToasts?: () => void;
};

/**
 * A React FC that Provides a Context for Toast-Notifications, creates a portal and renders notifications
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxDisplay,
  duration,
  className,
  toastOptions,
  types,
  autoClose,
  onHasToasts,
  onHsNoToasts,
}) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | undefined>(undefined);

  const [state, dispatch] = useReducer<contextReducer>(
    (state, action): toastState => {
      const { toasts } = state;

      switch (action.type) {
        case 'addOrUpdateToast':
          const toast = action.payload as toast;
          const newState: toastState = { toasts };

          if (!toast.id) {
            toast.id = `${Date.now().toString()}-${toast.type}`;
          }

          const toastExists = toasts.find((t) => t.id === toast.id);
          if (toastExists) {
            newState.toasts = toasts.map((t) => (t.id !== toast.id ? t : toast));
          } else {
            newState.toasts = [...toasts, toast];
          }

          return newState;
        case 'removeToast':
          return {
            toasts: toasts.filter((t) => t.id !== (action.payload as toastId)),
          };
        default:
          return state;
      }
    },
    { toasts: [] }
  );

  const { toasts } = state;

  useEffect(() => {
    toasts.length > 0 ? onHasToasts?.() : onHsNoToasts?.();
  }, [toasts, onHasToasts, onHsNoToasts]);

  useEffect(() => {
    (window as windowWithToast).addToast = (toast: toast) => dispatch({ type: 'addOrUpdateToast', payload: toast });
    (window as windowWithToast).removeToast = (toastId: toastId) => dispatch({ type: 'removeToast', payload: toastId });
  }, [dispatch]);

  const toastTypes = useMemo(
    (): toastTypes => ({
      success: {
        icon: <CheckCircleIcon className="w-10 h-10" />,
        iconClassName: 'text-green-500',
        borderClassName: 'border-green-500',
        closeIcon: <XIcon />,
        noIcon: <XIcon />,
        yesIcon: <CheckIcon />,
        buttonClassName: 'icon-button hover:bg-transparent border-green-500 text-green-500 hover:border-green-300 hover:text-green-300',
        ...types?.success,
      },
      info: {
        icon: <InformationCircleIcon className="w-10 h-10" />,
        iconClassName: 'text-blue-500',
        borderClassName: 'border-blue-500',
        closeIcon: <XIcon />,
        noIcon: <XIcon />,
        yesIcon: <CheckIcon />,
        buttonClassName: 'icon-button hover:bg-transparent border-blue-500 text-blue-500 hover:border-blue-300 hover:text-blue-300',
        ...types?.info,
      },
      warning: {
        icon: <ExclamationCircleIcon className="w-10 h-10" />,
        iconClassName: 'text-orange-500',
        borderClassName: 'border-orange-500',
        closeIcon: <XIcon />,
        noIcon: <XIcon />,
        yesIcon: <CheckIcon />,
        buttonClassName: 'icon-button hover:bg-transparent border-orange-500 text-orange-500 hover:border-orange-300 hover:text-orange-300',
        ...types?.warning,
      },
      error: {
        icon: <XCircleIcon className="w-10 h-10" />,
        iconClassName: 'text-red-500',
        borderClassName: 'border-red-500',
        closeIcon: <XIcon />,
        noIcon: <XIcon />,
        yesIcon: <CheckIcon />,
        buttonClassName: 'icon-button hover:bg-transparent border-red-500 text-red-500 hover:border-red-300 hover:text-red-300',
        ...types?.error,
      },
    }),
    [types]
  );

  const DEFAULT_DURATION = 8000;
  const defaultDuration = useMemo(() => duration ?? DEFAULT_DURATION, [duration]);
  const defaultAnimation = useMemo(
    () =>
      toastOptions?.animation ?? {
        startClassName: 'opacity-0',
        endClassName: 'opacity-100',
        animationClassName: 'transition-all duration-1000 ease-in',
        duration: 1000,
      },
    [toastOptions?.animation]
  );

  useEffect(() => {
    const id = 'toast-portal-root';
    let root = document.getElementById(id) ?? document.createElement('div');
    root.id = id;

    if (portalRoot) document.body.appendChild(root!);
    setPortalRoot(root);
  }, [portalRoot]);

  return (
    <Provider value={{ state, dispatch }}>
      {children}
      {portalRoot &&
        toasts.length > 0 &&
        createPortal(
          <div className={`${className ?? 'fixed top-1 right-1 w-full md:top-4 md:right-4 md:w-160 box-border text-white z-50'}`}>
            {toasts.slice(0, maxDisplay).map((toast) => (
              <Toast
                key={toast.id}
                {...toastOptions}
                animation={defaultAnimation}
                toast={{ duration: defaultDuration, autoClose, ...toast }}
                removeToast={() => dispatch({ type: 'removeToast', payload: toast.id! })}
                type={toastTypes[toast.type] as type}
              />
            ))}
          </div>,
          portalRoot
        )}
    </Provider>
  );
};

//#endregion
