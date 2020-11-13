import { updateFigureData } from 'chess/figures/functions';

export function transformFigure(transformArray, modelFigures, figure) {
    const { tags, figures: modFigures } = modelFigures;
    const newFigureName = transformArray[0];
    Object.keys(tags).forEach(tag => {
        const { figure: modFigure } = modFigures[newFigureName].figure;
        if (modFigure.hasOwnProperty(tag)) {
            updateFigureData(figure, tag, modFigure[tag], tags);
        }
    });
    figure.model = {};
}
