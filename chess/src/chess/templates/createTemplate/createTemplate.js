import { FiguresDataManager } from 'chess/figures/figures-creations/dataManager';
import {build} from './build';





export function createTemplate(buildCb, {title, configuration, meta}) {
    if (!(title && typeof title === 'string')) throw new Error(`You have to specify a title for template in object as a second argument. Received: ${title}`);
    const template = buildCb(FiguresDataManager, build);
    return {
        template,
        title, 
        configuration, 
        meta
    }
}


