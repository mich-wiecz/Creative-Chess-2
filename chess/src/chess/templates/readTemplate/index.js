import { prepareStateBeforeGame } from './prepareStateBeforeGame';
import { playgroundAdjustField } from './playgroundAdjustField';



export default function readTemplateMap (templateName) {
    prepareStateBeforeGame(templateName);
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








