import { classicNames, capablancaNames } from '@figures/names';
import { classicFiguresValues, capablancaFiguresValues } from '@figures/values';
import { classicFiguresMoves, capablancaFiguresMoves } from '@figures/movesSchemas';



   
        
        const modelFigures = {};
        Object.values(classicNames).forEach(name => {
            const figData = {
                category: 'classic',
                name,
                value: classicFiguresValues[name],
                movesSchema: classicFiguresMoves[name],
            }
            modelFigures[name] = figData;
        });
        
        Object.values(capablancaNames).forEach(name => {
            const figData ={
                category: 'capablanca',
                name,
                value: capablancaFiguresValues[name],
                movesSchema: capablancaFiguresMoves[name],
            }
            modelFigures[name] = figData;
        });










    

