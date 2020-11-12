



export class FiguresFinder  {

    constructor(figuresPath, adjustData) {
        this._path = figuresPath;

        if (adjustData) {
            this._adjustData = adjustData;
            this._adjustmentType = 'custom'
        } else {
            this._adjustData = (data) =>  data;
            this._adjustmentType = 'default';
        }
    }

    find(cb) {
        const allFigures = this._path.figures;

        if(cb) {
            let foundedFigures = {};
            for(let figure in allFigures) {
                const figData = allFigures[figure];
                if(cb(figData)) this._adjustData(figData);
            }
            return foundedFigures;
        }

        if(this._adjustmentType === 'default')  return allFigures;
        let result = {};
        for(let key in allFigures) {
          result[key] = this._adjustData( allFigures[key])
        }
        return result;
       
    }


    findByKeys(keys) {
        let foundedFigures = {};
        if (typeof keys === 'string') {
            const key = keys;
            if(!this._path.figures.hasOwnProperty(key)) return undefined;

            foundedFigures[key] =  this._adjustData( this._path.figures[key]); 
             return foundedFigures;
        }
        
        if(Array.isArray(keys)) {
            keys.forEach(key => {
            if(!this._path.figures.hasOwnProperty(key)) {
                foundedFigures[key] = undefined;
            }  else foundedFigures[key] =  this._adjustData( this._path.figures[key]) 
            })
            return foundedFigures;
        }
    }


      findByTags(searchArr) {
        const errorMess = `Wrong argument. Received: ${searchArr}. Should be in the simplest form: [['category', 'capablanca'], ['team', 'black']] (tag - wanted value (could be callback also) pairs).`
        if (!Array.isArray(searchArr)) throw new Error(errorMess)

        const self = this;

        const last = searchArr[searchArr.length - 1];
        let cb = undefined;
        if (typeof last === 'function') cb = searchArr.pop();

        
        function getFounded  () {

            function isValidTagArr  (tagArr)  {
            
                return  Array.isArray(tagArr) &&
                    tagArr.length === 2 &&
                 self._path.tags.hasOwnProperty([tagArr[0]]) 
                
            }
            let founded = [];
            for(let tagArr of searchArr) {
               
                if (!isValidTagArr(tagArr)) 
                throw new Error(errorMess);
                        const [tagName, wanted] = tagArr;
                                const tag = self._path.tags[tagName]
                                if(typeof wanted === 'function') { 
                                    let innerFounded = [];
                                    Object.keys(tag).forEach(tagName => {
                                        if (wanted(tagName)) {
                                            innerFounded = innerFounded.concat(tag[tagName]);
                                        }
                                    })
                                    founded = innerFounded;
                                } else {
                                    founded = founded.concat(tag[wanted])
                                }
                              

            }
            return founded;
        }


        function getDataFromFounded  (found)  {
            function assignWithCallback (result, item, figureData) {
                if(cb(figureData)) (result[item] = self._adjustData(figureData))
            }
    
            function assignWithoutCallback  (result, item, figureData)  {
                result[item] =  self._adjustData(figureData)
            }
    
            let uniqueFounded = searchArr.length > 1 ? Array.from(new Set(found)) : found;
    
            function collectData  (assignFunc)  {
                return uniqueFounded.reduce((result, item) => {
                    const figureData = self._path.figures[item]
                    assignFunc(result, item, figureData)
                    return result;
                }, {})
            }
    
        return collectData((cb ? assignWithCallback : assignWithoutCallback));
        }

        const found = getFounded();
        return getDataFromFounded(found);
    }

    findByLuck(n = 3) {
   
      const  self = this;

        function drawFounded () {
            const allFiguresKeys = Object.keys(self._path.figures);
            let length = allFiguresKeys.length;
            if (n > length - 1) n = length;
            const found = [];
            for (let i = 0; i < n; i++) {
                const index = Math.random() * length; 
                found.push(allFiguresKeys[index]);
            }
            return found;
        }

        function getDataFromFounded (found) {
            let result = {};
            found.forEach(key => {
              result[key] = self._adjustData(self._path.figures[key])
            })
           return result;
            }

        const found = drawFounded();
        return getDataFromFounded(found);

    }

    printTags() {
        const {tags} = this._path;
        let allTags = {}
        for(let tag in tags) {
            allTags[tag] = Object.keys(tags[tag]);
        }
        return allTags;
    }


}





export class ModelFiguresFinder extends FiguresFinder {

    // constructor(path) {
    //     super(path)
    //     }

findByNames(names) {return this.findByKeys(names)}

}


export class IndividualFiguresFinder extends FiguresFinder {

    // constructor(path, adjustDataWhenFound) {
    // super(path, adjustDataWhenFound)
    // }

    findByIds(ids) { return this.findByKeys(ids) }


}