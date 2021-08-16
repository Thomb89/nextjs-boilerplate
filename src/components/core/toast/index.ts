// ====================================================================================
// TOAST TYPES
// ====================================================================================
//#region TYPES

export type toastId = string;

export type toastType = 'info' | 'warning' | 'error' | 'success';

export type toast = {
  id?: toastId;
  content: JSX.Element | string;
  type: toastType;
  duration?: number;
  autoClose?: boolean;
  buttons?: {
    closeButton?: boolean;
    onClose?: () => void;
    messageResult?: (result: 'yes' | 'no') => void;
  };
};

export { Toast } from './toast';
export { ToastProvider } from './toast-provider';
export { useToast } from './use-toast';

export type { ToastProps, toastTypes } from './toast';
export type { ToastProviderProps, windowWithToast } from './toast-provider';
export type { useToastResult } from './use-toast';

//#endregion
