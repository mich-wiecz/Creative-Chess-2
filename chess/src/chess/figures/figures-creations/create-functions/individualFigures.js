import { dataStore } from '@chess/store';
import {nanoid} from 'nanoid';
import toUpperFirst from '@global-functions/toUpperFirst';

 function upsertTags (figuresDataPath, figureData, id) {
    const {name} = figureData;
    const modelsTags = Object.keys(dataStore.modelFigures.tags);
    const tagsFromModel = modelsTags.reduce((tags, tag) => {
        tags[tag] = dataStore.modelFigures.figures[name].figure[tag];
        return tags;
    }, {})

    const {tags} = figuresDataPath;

 
    for(let tagName in tags) {
    let figTagValue;
    if (figureData.hasOwnProperty(tagName)) {
        figTagValue = figureData[tagName];
    } else if (tagsFromModel.hasOwnProperty(tagName)) {
        figTagValue = tagsFromModel[tagName]
    } else {
        figTagValue = 'no' + toUpperFirst(tagName);
    }

    const tag = tags[tagName];
    
    if (!tag.hasOwnProperty(figTagValue)) (tag[figTagValue] = []);
    tag[figTagValue].push(id);
    }
 
 }

export function createIndividualFigure (coord, figName, teamObj, modification) {
    const {figures: indFigures} = dataStore.defaultGame;
    const id = nanoid();

    const figureData =  {
        figure: {
            id,
            name: figName,
            team: teamObj.name,
            startPosition: coord,
            color: teamObj.color || teamObj.name,
            position: coord,
            status: 'active',
        },
        model: {}
    };

    if (modification) {
        modification.wasOverridden = true;
        figureData.model = modification;
    }

     indFigures[id] = figureData;

    upsertTags(dataStore.defaultGame, figureData.figure, id)

    return `${teamObj.name}##${figName}##${id}`
}