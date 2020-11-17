

    // indexes.forEach(index => {

    //     /**
    //      * @function
    //      * @param {string} figIndex
    //      * @param {object} movesObj
    //      *  @param {'without-moving'|'without-capturing'} option
    //      * @returns {void}
    //      */
    // function generatePossibleMoves (figIndex, movesObj, option) {

    //     const details = figuresLookupTable.details[figIndex];
    //     const static = figuresLookupTable.static[figIndex];
    //     const {movesMapping} = figuresLookupTable;
    //     let {moves} = figuresLookupTable.moves[figIndex];
    //     moves = [];
    //     const {steps, amount} = movesObj;
        

    //     steps.forEach(stepObj => {
    //         let i = 0, resultArr = [];
            
    //         while (++i < amount) {
    //             const {col: colMove = 0, row: rowMove = 0} = stepObj;
    //             const [col, row] = splitCoord(details.position)
    //             const newCoord = makeCoord(col + colMove, row + rowMove);
    //             const checkRes = getFieldCheckResponse(boardMap[newCoord], static.team);
    //             switch(checkRes) {
    //                 case 'move': 
    //                 resultArr.push(newCoord);
    //                 if (movesMapping.hasOwnProperty(newCoord)) {
    //                     movesMapping[newCoord].push(figIndex);
    //                 } else movesMapping[newCoord] = [figIndex]
    //             }
               
    //         } 
    //     })
        

    // } 

    //         const {
    //             movesSchema
    //         } = figuresLookupTable.moves[index];


    //     function getTypeOfSteps (stepsObj) {
    //         if (stepsObj.hasOwnProperty("moves")) return 'standard';
    //         if(stepsObj.hasOwnProperty("walk")) return 'extended'

    //         throw new Error(`Not correct moves schema type. Received: ${stepsObj} `)

    //     }

    //     movesSchema.forEach(stepsObj => {

    //         const stepsType = getTypeOfSteps(stepsObj);

    //         if (stepsType === 'extended') {
    //             if (!stepsObj.walk.hasOwnProperty('amount')) {
    //                 stepsObj.walk.amount = stepsObj.amount;
    //             }
    //             generatePossibleMoves(
    //             index,
    //              stepsObj.walk,
    //             'without-capturing'
    //             );

    //             if (!stepsObj.capture.hasOwnProperty('amount')) {
    //                 stepsObj.capture.amount = stepsObj.amount;
    //             }
    //             generatePossibleMoves(
    //                 index,
    //                 stepsObj.capture,
    //                 'without-moving'
    //             );
    //         }

    //     })

        

    // })





    // function getFieldCheckResponse (boardField, team) {
    // const isBlanc = boardField === "blanc";
    // if (isBlanc) return "move";
    // const isEnemy = isStringFigure(boardField) && extractTeam(boardField) !== team;
    // if (isEnemy) return "capture";
    // return 'block';
    // }




    // function addFiguresToBoard(figures, boardMap, option) {

    //     const indexes = [];
    
    //     for (let coord in figures) {
    //         if (!isCoord(coord)) throw new Error(`${coord} is not a valid coord.`)
    
    //         const couldBeAssigned = (coord, boardMap, option) => {
    //             return option === 'force' ||
    //                 !boardMap.hasOwnProperty(coord) 
    //                 boardMap[coord] === 'blanc'
    //         }
    
    //         if (!couldBeAssigned(coord, boardMap, option) && option !== 'only-when-free')
    //             throw new Error('There is an entity in the place of coord. Add "force" or "only-when-free" if you do not want an error');
    
    //         const figuresDataCopy = JSON.parse(JSON.stringify(figures));
    //         const {id} = figuresDataCopy;
    //         const table = figuresLookupTable;
    //         table.moves[id] = {
    //             moves: [],
    //             movesSchema: [],
    //             movesSchemaWhenLastMove: []
    //         }
    //         table.static[id] = figuresDataCopy;
    //         table.details[id] =    {
    //             startPosition: coord,
    //             position: coord,
    //             status: 'active'
    //         };
    //         boardMap[coord] = `${figuresDataCopy.team} ${figuresDataCopy.name} ${figuresDataCopy.id}`
    
    
    //         indexes.push(figuresDataCopy.id)
    //     }
    
    // }