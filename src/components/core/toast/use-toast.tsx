import { useCallback, useContext } from 'react';
import { toastContext } from './context';
import { toast, toastId } from './index';

// ====================================================================================
// TOAST EXPORTED HOOK
// ====================================================================================
//#region EXPORTED HOOK

export type useToastResult = {
  addOrUpdateToast: (toast: toast) => void;
  removeToast: (id: toastId) => void;
};

/**
 * react hook that uses the ToastContext to add, update or delete toasts from the context
 * @returns {*func} to add or update a toast (update is performed, when a toast with the same ID exists)
 * @returns {*func} to remove a toast
 */
export const useToast = (): useToastResult => {
  const { dispatch } = useContext<toastContext>(toastContext);

  const addOrUpdateToast = useCallback((toast: toast) => dispatch({ type: 'addOrUpdateToast', payload: toast }), [dispatch]);
  const removeToast = useCallback((toastId: toastId) => dispatch({ type: 'removeToast', payload: toastId }), [dispatch]);

  return { addOrUpdateToast, removeToast };
};

//#endregion
