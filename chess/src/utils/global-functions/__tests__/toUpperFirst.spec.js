import toUpperFirst from '../toUpperFirst';

describe('toUpperFirst function', () => {
    const stringVariations = ['cat', 'Superman', 'bATman', 'k_;AtF', "ADAM"]
    it.each(stringVariations)(`string %s should have upper first letter`, (string) => {
        expect(toUpperFirst(string[0])).toBe(string[0].toUpperCase())
    })


    it.each(stringVariations)(`string %s will be the same string as given except (if dont have before) uppercase first letter`, (string) => {
        expect(toUpperFirst(string).slice(1)).toBe(string.slice(1))
    })


    it.each([null, undefined, {}, [], new Map(), false, 10])(`other value than string =  %s will cause throwing an error`, (notString) => {
        expect(() => toUpperFirst(notString)).toThrow()
    })

})