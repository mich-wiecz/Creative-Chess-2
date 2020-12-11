import React, { createContext, useContext} from 'react';
import {useSelector} from 'react-redux';
import {selectLanguage} from 'redux/userSlice';


export const TranslationContext = createContext(() => {});
export const TranslationConsumer = TranslationContext.Consumer;
export const useTranslation = () => useContext(TranslationContext);

export function TranslationProvider({children}) {

    const actualLanguage = useSelector(selectLanguage);

    const handleGivingTranslation = (langObj) => {
        if (!actualLanguage) return langObj.pl
        if (typeof langObj !== 'object' || !langObj.hasOwnProperty(actualLanguage)) {
            throw new Error(`${actualLanguage} is not property of given item`)
        }
        return langObj[actualLanguage];
    }


return (
    <TranslationContext.Provider
    value={handleGivingTranslation}
    >
        {children}
    </TranslationContext.Provider>
);
}

