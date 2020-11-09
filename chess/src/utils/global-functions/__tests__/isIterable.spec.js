import isIterable from '../isIterable'
describe('isIterable function', () => {

    it('returns true if I pass an array with elements', () => {
        expect(isIterable([10, 11])).toBe(true)
    })

    it('returns true if I pass empty array', () => {
        expect(isIterable([])).toBe(true)
    })

    it('returns false if I pass plain object', () => {
        expect(isIterable({a: 3, b: 5})).toBe(false)
    })

    it('returns true if I pass a Map', () => {
        const map = new Map();
        map.set('a', 2);
        map.set('b', 3);
        expect(isIterable(map)).toBe(true)
    })

    it('returns false if I pass a function', () => {
        expect(isIterable((() => 2))).toBe(false)
    })

    it.each([1, NaN, false, true])('returns false for numbers and booleans', (primitive) => {
        expect(isIterable(primitive)).toBe(false)
    });

    it('returns true if I pass a string', () => {
        expect(isIterable('string')).toBe(true)
    })


})