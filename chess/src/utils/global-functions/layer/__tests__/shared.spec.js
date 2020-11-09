import { getData } from '../functions/shared';

describe('shared module', () => {

    describe('getData function]', () => {

        // base arguments
        const key = 'a', firstObj = {}, secondObj = {};

        it(`will return an array from base arguments as key: ${key}, topObj: ${firstObj} and bottomObj: ${secondObj}`, () => {
            expect(Array.isArray(getData(key, firstObj, secondObj))).toBe(true)
        })

    it('will return first value in the array (areIntersected) as false when both objects do not have the same key', () => {
        expect(getData(key, firstObj, secondObj)[0]).toBe(false)
    })

    it('will return first value in the array (areIntersected) as true when both objects have the same key', () => {
        expect(getData(key, {[key]: 2}, {[key]: '3'})[0]).toBe(true)
    })

    it('return second value in the array as null if object as second argument do not own a key (from first argument)', () => {
        expect(getData(key, firstObj, secondObj)[1]).toBe(null)
    })

    it('return third value in the array as null if object as third argument do not own a key (from first argument)', () => {
        expect(getData(key, firstObj, secondObj)[2]).toBe(null)
    })

    it.each(['string', 10])('will return %s as second value in the array if second argument is an object containing this value in a key from first argument', (value) => {
        expect(getData(key, {[key]: value}, {[key]: '3'})[1]).toEqual(value)
    })


    it.each(['string', 10])('will return %s as third value in the array if third argument is an object containing this value in a key from first argument', (value) => {
        expect(getData(key, {[key]: 2}, {[key]: value})[2]).toEqual(value)
    })

    const expectedArr = [false, null, null];
    it(`returns the ${expectedArr} when both object dont have the key in first argument`, () => {
        expect(getData(key, firstObj, secondObj)).toEqual(expectedArr)
    })
  
    })

    

})
