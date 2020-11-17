export { FiguresDataManager } from 'chess/figures/figures-creations/dataManager';
export {build} from './build';



export  function addTemplate (templates, {title, ...templateData}) {
 
    templates[title] = {...templateData};
}

// export function createPlaygroundTemplate (cb) {
//     return cb((templateArray) => {
//         return 69;
//     });
// }





// export function createPlaygroundTemplate (cb) {
//     return cb((templateArray) => {
//         return 69;
//     });
// }
