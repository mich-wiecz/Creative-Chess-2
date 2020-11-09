import Layer from '../layer';
import getIntersected from '../functions/getIntersected';
import getNonIntersected from '../functions/getNonIntersected';
import merge from '../functions/merge';


const resultProperty = '_resultObj';
const bottomProperty = 'bottomObj'

describe.skip('layer class', () => {

    it('will throw an error if I pass not object to the constructor', () => {
        expect(() => new Layer(10)).toThrow()
    })

    const name = 'bottomObj'
    it(`will have property ${name} with object passed to the constructor`, () => {
        expect(new Layer({a: 10})[name]).toEqual(expect.any(Object));
    })



    const bottomObj = {a: 2, b: 12};
    describe.each(['getIntersected', 'merge', 'getNonIntersected'])('main methods', (method) => {

        const result = new Layer(bottomObj)[method]({});

        it(`calling ${method} method should return new Layer instance of Layer`, () => {
            expect(result).toBeInstanceOf(Layer)
        })

        
        it(`new Layer instance returned from method ${method} should have property ${bottomProperty}`, () => {
            expect(result).toHaveProperty(bottomProperty);
        })

        const functions = {merge, getIntersected, getNonIntersected}
        it.each([ {a: 5, c: true}, {}, {b: 'g', z: false}])(`property ${bottomProperty} on new instance of Layer from method ${method} should be the same as a result of function ${method} given the same bottom and top object (as %o)`, (topObj) => {
            expect((new Layer({...bottomObj}))[method](topObj).bottomObj)
            .toEqual(functions[method]({...bottomObj}, topObj))
        })
    })


    describe('prepare method', () => {
        
      
        it(' will call the callback if callback return two arrays', () => {
            const mockCallback = jest.fn((obj1, obj2) => [obj1, obj2]);
            new Layer({a: 5, b: 10}).prepare(mockCallback);
            expect(mockCallback).toBeCalled();
        })
    
        it(' will throw an error if callback do not return two arrays', () => {
           
            expect(() => new Layer({a: 5, b: 10}).prepare(() => {})).toThrow();
        })
    
        it(' will throw an error if callback return array with two elements different that object', () => {
            expect(() => new Layer({a: 5, b: 10}).prepare(() => [null, true])).toThrow();
        })
    
       
        it(` will replace instance property ${resultProperty} with second object from array returned by callback`, () => {
            const instance = new Layer({a: 5, b: 10});
            instance[resultProperty] = {};
            const newResultObj = {a: 1, b: 2}
            instance.prepare(() => [{}, newResultObj]);
            expect(instance[resultProperty]).toEqual(newResultObj)
        })

        
        it(` will replace instance property ${bottomProperty} with first object from array returned by callback`, () => {
            const bottomObj = {a: 5, b: 10}
            const instance = new Layer(bottomObj);
            const newBottomObj = {};
            instance.prepare(() => [newBottomObj, {a: 1, b: 2}]);
            expect(instance[bottomProperty]).toEqual(newBottomObj)
        })

        it(`will return this (actual instance of Layer)`, () => {
            const instance = new Layer(bottomObj);
            expect(instance.prepare(() => [{}, {}])).toBe(instance)
        })

        it.each([{a: 5, b: 7}, {13: 13, 100: 1}])(`if method assigned new ${resultProperty} with properties = method  getIntersected (as example) will return instance of Layer with ${bottomProperty} that will always includes properties from ${resultProperty}`, (resultObj) => {
            const instance = new Layer(bottomObj);
            instance.prepare(() => [{}, resultObj]);
            const newInstance = instance.getIntersected({b: 77, z: true});
            expect(newInstance.bottomObj).toEqual(expect.objectContaining(resultObj))
        })

        it.each([{a: 5, b: 7}, {13: 13, 100: 1}])(`second method after prepare could overwrite properties from ${resultProperty}`, (resultObj) => {

            const intersectedWithResultObj = {}
            for(let item in resultProperty) {
                intersectedWithResultObj[item] = Math.random();
            }

            const instance = new Layer(bottomObj);
            instance.prepare(() => [{}, resultObj]);
            const thirdInstance = instance
            .getIntersected({b: 77, z: true})
            .getIntersected(intersectedWithResultObj);

   
            expect(thirdInstance.bottomObj).not.toEqual(expect.objectContaining(resultObj))
        })

    })
    
  

})