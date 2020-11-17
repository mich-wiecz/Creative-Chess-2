import { prepareStateBeforeGame } from './prepareStateBeforeGame';
import { playgroundAdjustField } from './playgroundAdjustField';



export  function readTemplate (state, templateName) {
    prepareStateBeforeGame(state, templateName);
}


export function readPlaygroundMap(templateName, playgroundMap) {

    if (!Array.isArray(playgroundMap)) {
        playgroundMap = [playgroundMap];
    }

    prepareStateBeforeGame(templateName, {
        adjustField: playgroundAdjustField,
        map: playgroundMap
    });


}








