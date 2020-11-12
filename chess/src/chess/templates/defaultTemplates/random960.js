import range from '@global-functions/range';



function getRandomPositions( setsObject) {
    let availableFields, startFields;
    availableFields = startFields =  range(0, 7);
    let kingPosition = null,
        result = {};

    const drawPositionOfFigure = (
        figureName,
        drawingArray,
        isKing
    ) => {
        const resultField = drawingArray[Math.floor(Math.random() * drawingArray.length)];

        if (isKing)
            kingPosition = resultField;

        availableFields = availableFields.filter((field) => field !== resultField);

        for(let setName in setsObject) {
        if(!result.hasOwnProperty(setName)) {
            result[setName] = []
        };

        result[setName].push(setsObject[setName][figureName]);
    }
        

    }
    

        // 1. one of 4 white poles for white poles bishop
        drawPositionOfFigure(
            "Bishop",
            startFields.filter((_field, index) => {
                return (index + 1) % 2 === 0;
            })
        );
        // 2.  accordingly to dark pole bishop
        drawPositionOfFigure(
            "Bishop",
            startFields.filter((_field, index) => {
                return (index + 1) % 2 !== 0;
            })
        );
        // 3. king have 4 possibilities because it cannot be on the furthest sides
        drawPositionOfFigure(
            "King",
            availableFields.slice(1, availableFields.length - 1),
            true
        );
        // 4. The rook on left of the king
        drawPositionOfFigure(
            "Rook",
            availableFields.filter((field) => {
                if (typeof kingPosition !== "number")
                    return field;
                return field < kingPosition;
            })
        );
        // 5. The rook on the right of the king
        drawPositionOfFigure(
            "Rook",
            availableFields.filter((field) => {
                if (typeof kingPosition !== "number")
                    return field;
                return field > kingPosition;
            })
        );
        // 6. 3 available poles for hetman
        drawPositionOfFigure("Queen", availableFields);
        // 6. knights on the remaining two poles
        drawPositionOfFigure("Knight", availableFields);
        drawPositionOfFigure("Knight", availableFields);
        // The same setting for black as for white
        return result;


}




    
const meta = {
    longTitle: 'random / 960 / Fisher chess',
    description: ''
}

const gameConfiguration = {
    rotation: 0,
}

const buildConfiguration = {
    provideExtremes: {
        top: 7,
        right: 7,
        bottom: 0,
        left: 0
    }
}



    export const classicGame = {
        buildCallback: (FiguresManager, build) => {

            const classicFigures = FiguresManager.modelFigures.findByTags([['category', 'classic']]);
            const teams = FiguresManager.createBlackAndWhiteTeams(classicFigures);
            const { white: { figuresSet: whiteSet }, black: { figuresSet: blackSet } } = teams;


        const {white: whitePositions, black: blackPositions} = getRandomPositions(null, {white: whiteSet, black: blackSet});

            return build([
                {
                    from: '0|0',
                    to: '7|7',
                    fill: 'blanc',
                    nest: [
                        {
                            from: '0|0',
                            colSpan: 8,
                            fill: whitePositions
                        },
                        {
                            from: '0|1',
                            colSpan: 8,
                            fill: [whiteSet.Pawn]
                        },
                        {
                            from: '0|7',
                            colSpan: 8,
                            fill: blackPositions
                        },
                        {
                            from: '0|6',
                            colSpan: 8,
                            fill: [blackSet.Pawn]
                        },
                    ]
                }
            ], teams, buildConfiguration);
        },
        title: '960',
        configuration: gameConfiguration,
        meta
    };




