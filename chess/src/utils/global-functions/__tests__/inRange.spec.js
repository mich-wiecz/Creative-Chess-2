import inRange from '../inRange';

describe('inRange function', () => {

it('returns true if value is more than minimum and less than maximum', () => {
    const value = 5, minimum = value - 1, maximum = value + 5;
    expect(inRange(value, minimum, maximum)).toBe(true)
})

it('returns false if value is more than maximum', () => {
    const value = 6, minimum = value - 5, maximum = value - 1;
    expect(inRange(value, minimum, maximum)).toBe(false)
})

it('returns false if value is less than minimum', () => {
    const value = 6, minimum = value + 1, maximum = value + 3;
    expect(inRange(value, minimum, maximum)).toBe(false)
})

it('returns true if value is equal minimum', () => {
    const  minimum = 1, maximum =  3;
    expect(inRange(minimum, minimum, maximum)).toBe(true)
})


it('returns true if value is equal maximum', () => {
    const  minimum = 1, maximum =  3;
    expect(inRange(maximum, minimum, maximum)).toBe(true)
})

it('returns true if value is equal maximum', () => {
    const  minimum = 1, maximum =  3;
    expect(inRange(maximum, minimum, maximum)).toBe(true)
})


it('returns true if all values are the same', () => {
    const  value = 1;
    expect(inRange(value, value, value)).toBe(true)
})

it('throw error when maximum is less than minimum', () => {
    const value = 6, minimum = value + 3, maximum = minimum -1;
    expect(() => inRange(value, minimum, maximum)).toThrow()
})

})