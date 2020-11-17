
import React, {useState, createContext, useContext} from 'react';
import MyToast from '@global-components/MyToast';
import classes from '@global-components/MyToast/MyToast.module.scss';


 const ToastContext = createContext(() => {});
export const ToastConsumer = ToastContext.Consumer;
export const useToasts = () => useContext(ToastContext);

export function ToastProvider({children}) {

    const [toasts, setToasts] = useState({});

    const updateToastsData = (toastName, showToast, text) => {
            setToasts(prev => {
                const toastCopy = prev[toastName].slice();
                toastCopy[0] = showToast;
                toastCopy[1] = {
                    ...toastCopy[1],
                    toastStyleType: toastCopy[1].toastStyleType === 0 ? 1 : 0,
                    text: text ? text : toastCopy[1].text
                }
                return {
                    ...prev,
                    [toastName]: toastCopy
                }
            })
    }


   const handleOnClose = (toastName) => {
      updateToastsData(toastName, false);
    }

    const showToast = (toastName, text) => {
        if (!toasts.hasOwnProperty(toastName))
            return;
        updateToastsData(toastName, true, text);
    }

    const createToast = (toastName, configObject = {}) => {
        if(toasts.hasOwnProperty(toastName)) return toastName;
        setToasts(prev => {
            return {
                ...prev,
                [toastName]: [
                    false, 
                    {...configObject, toastStyleType: 0}
                ]
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

