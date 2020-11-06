
import React, {useState, createContext, useContext} from 'react';
import MyToast from '@global-components/MyToast';
import classes from '@global-components/MyToast/MyToast.module.scss';

 const ToastContext = createContext(() => {});
export const ToastConsumer = ToastContext.Consumer;
export const useToasts = () => useContext(ToastContext);

export function ToastProvider({children}) {

    const [toasts, setToasts] = useState({});

    const setToastIsActive = (toastName, value) => {
            setToasts(prev => {
                return {
                    ...prev,
                    [toastName]: [value, {...prev[toastName][1]}]
                }
            })
    }


   const handleOnClose = (toastName) => {
      setToastIsActive(toastName, false);
    }

    const showToast = (toastName) => {
        setToastIsActive(toastName, true);
    }

    const createToast = (toastName, configObject = {}) => {
        if(toasts.hasOwnProperty(toastName)) return;
        setToasts(prev => {
            return {
                ...prev,
                [toastName]: [false, configObject]
            }
        })
        return toastName;
    }



return (
    <ToastContext.Provider value={[showToast, createToast]}>
        <div className={classes.ToastContainer}>
        {
     Object.keys(toasts).map((toastName, index) => {
        const [show, configuration] = toasts[toastName];
    
  return <MyToast 
    key={toastName + index}
    show={show}
    onClose={() => handleOnClose(toastName)}
    {...configuration}
    />
})
        }
</div>
        {children}
    </ToastContext.Provider>
)
}

