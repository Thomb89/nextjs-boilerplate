import { createContext, Dispatch, ReducerAction } from 'react';
import { toast } from './index';
import { contextReducer } from './toast-provider';

// ====================================================================================
// TOAST CONTEXT
// ====================================================================================
//#region CONTEXT

export type toastState = {
  toasts: toast[];
};

export type toastContext = {
  state: toastState;
  dispatch: Dispatch<ReducerAction<contextReducer>>;
};

export const toastContext = createContext<toastContext>({ state: { toasts: [] }, dispatch: () => {} });
toastContext.displayName = 'Toast-Context';
export const { Provider } = toastContext;

//#endregion
