import { FiguresDataManager } from '../../figures/figures-creations/dataManager';
import { dataStore} from '../../store.js';
import {createNextState as produce} from '@reduxjs/toolkit'
import {build} from './build';


export function createBoardTemplate (cb, {title, configuration, meta}) {
    const template =  cb(FiguresDataManager, build);
    if (!(title && typeof title === 'string')) throw new Error(`You have to specify a title for template in object as a second argument. Received: ${title}`);
   const nextState =  produce(dataStore, newState => {
        newState.templates[title] = {
            template,
            configuration,
            meta
        } 
    })

    dataStore = nextState;
    
}

export function createPlaygroundTemplate (cb) {
    return cb((templateArray) => {
        return 69;
    });
}




