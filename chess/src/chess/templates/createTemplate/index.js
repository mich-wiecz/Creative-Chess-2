import { FiguresDataManager } from '../../figures/figures-creations/dataManager';
import {build} from './build';



export  function createTemplate (state, {buildCallback, title, ...rest}) {
    if (!(title && typeof title === 'string')) throw new Error(`You have to specify a title for template in object as a second argument. Received: ${title}`);
    const template =  buildCallback(FiguresDataManager, build);
    state[title] = {template, ...rest};
    
}

// export function createPlaygroundTemplate (cb) {
//     return cb((templateArray) => {
//         return 69;
//     });
// }




