import { classicNames, capablancaNames } from '../names';
import { classicFiguresValues, capablancaFiguresValues } from '../values';
import { classicFiguresMoves, capablancaFiguresMoves } from '../movesSchemas';
import { createModelFigure } from './create-functions/modelFigures';
import { FiguresDataManager } from './dataManager';
import { dataStore } from '../../store';


Object.values(classicNames).forEach(name => {
    const figData = {
        category: 'classic',
        name,
        value: classicFiguresValues[name],
        movesSchema: classicFiguresMoves[name],
    }
    createModelFigure(figData);

});

Object.values(capablancaNames).forEach(name => {
    const figData ={
        category: 'capablanca',
        name,
        value: capablancaFiguresValues[name],
        movesSchema: capablancaFiguresMoves[name],
    }
    createModelFigure(figData);
});



// const manager = FiguresDataManager;
// const found = manager.modelFigures.findByNames(['Pawn', "King"]);
// const {white, black} = manager.createBlackAndWhiteTeams(found);

// console.log(white.createKing(), dataStore.defaultGame.figures)