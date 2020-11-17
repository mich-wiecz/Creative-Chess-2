
import { updateFigureData } from 'chess/figures/functions';

export function transformFigure(transformArray, state, figureData) {
    const { figures: modFigures } = state.modelFigures,
    {tags: gameTags} = state.game;
    

    figureData.figure.previousForm = figureData.figure.name;

    const newFigureName = transformArray[0];
    Object.keys(gameTags).forEach(tag => {
        const { figure: modFigure } = modFigures[newFigureName];
        if (modFigure.hasOwnProperty(tag)) {
            updateFigureData(figureData.figure, tag, modFigure[tag], gameTags);
        }
    });
    
    figureData.model = {};
}