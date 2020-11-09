import setCallsLimit from '../setCallsLimit';
describe('setCallsLimit function', () => {
    
    const exampleFunction = () => 2;

    it('will return function if I pass a function as first argument', () => {
        expect(setCallsLimit(exampleFunction, 1)).toEqual(expect.any(Function))
    })

    it.each([undefined, "string", false, 10, {}, [], new Map()])('throws error if I pass something different than function as first argument', (sth) => {
        expect(() => setCallsLimit(sth, 1)).toThrow();
    })

    it.each([0, 1, 2])(`will return the ${exampleFunction()} - %s number of times, then undefined`, (n) => {
        const limitedFn = setCallsLimit(exampleFunction, n);
        // @ts-ignore
        const fMock = jest.fn(limitedFn).mockName('limitedFn')
        while (n > 0) {
            fMock();
            n--
        }
        expect(fMock()).toBe(undefined)
    })

})
