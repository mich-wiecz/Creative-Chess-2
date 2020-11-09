import range from '../range';
describe('range function', () => {

    // base arguments
    let start = 0, length = 4, step = 1;

    const expectedResultFromBaseArgs = [0, 1, 2, 3]

    it('returns a not null / undefined value', () => {
        expect(range(start, length, step)).toEqual(expect.anything())
    })

    it(`returns ${expectedResultFromBaseArgs} given base arguments`, () => {
        expect(range(start, length, step)).toEqual(expectedResultFromBaseArgs)
    })

    it('returns double values if I double the step value', () => {
        expect(range(start, length, step * 2)).toEqual(expectedResultFromBaseArgs.map(value => value * 2))
    })


    it('returns empty array if length is 0 or less', () => {
        expect(range(start, 0, step)).toEqual([]);
        expect(range(start, -1, step)).toEqual([]);
    })

    it(`returns ${expectedResultFromBaseArgs} given stringified base arguments `, () => {
        // @ts-ignore
        expect(range(start.toString(), length.toString(), step.toString())).toEqual(expectedResultFromBaseArgs)
    })


    it(`return negative equivalents of ${expectedResultFromBaseArgs} if step is negative`, () => {
        expect(range(start, length, -step)).toEqual(expectedResultFromBaseArgs.map(value => {
            if (value !== 0) return -value; 
            return 0}))
    })




})