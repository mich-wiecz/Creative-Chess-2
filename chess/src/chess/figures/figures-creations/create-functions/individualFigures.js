
import toUpperFirst from '@global-functions/toUpperFirst';

 function upsertTags (state, figureData, id) {
    const {name} = figureData;
    const modelsTags = Object.keys(state.modelFigures.tags);
    const tagsFromModel = modelsTags.reduce((tags, tag) => {
        tags[tag] = state.modelFigures.figures[name].figure[tag];
        return tags;
    }, {})

    const {tags} = state.game;

 
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

export function createIndividualFigure (state, coord, figName, {id, ...teamObj}, modification) {
    const {figures: indFigures} = state.game;

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

    upsertTags(state, figureData.figure, id)

    return `${teamObj.name}##${figName}##${id}`
}

