import React from 'react';
import useKeydown from '../../hooks/useKeyDown';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [ toasts, setToasts ] = React.useState([
    {
      id: crypto.randomUUID(),
      message: 'It works!',
      variant: 'success',
    },
    {
      id: crypto.randomUUID(),
      message: 'Logged in',
      variant: 'success',
    },
  ]);

  const addNewToast = React.useCallback((message, toastVariant) => {
    const newToasts = [ 
      ...toasts, 
      {
        id: crypto.randomUUID(),
        message: message,
        variant: toastVariant
      }
    ];
    setToasts(newToasts);
  }, [ toasts ]);
  const handleDissmis = React.useCallback(( id ) => {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    
    setToasts(nextToasts);
  }, [ toasts ]);

  const dissmisAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown( 'Escape', dissmisAll );

  const value = React.useMemo(() => {
    return {
      toasts,
      addNewToast,
      handleDissmis,
    }
  }, [ toasts, addNewToast, handleDissmis ]);
  
  return (
    <ToastContext.Provider value={ value } >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;

