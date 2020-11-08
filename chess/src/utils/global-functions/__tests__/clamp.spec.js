const clamp = require('../clamp');
describe('clamp function', () => {
    const minimum = 1, maximum = 10;

it('value less than minimum so should return minimum', () => {
    expect(clamp(minimum - 1, minimum, maximum)).toBe(1)
})

it('value greater than maximum so should return maximum', () => {
    expect(clamp(maximum + 1, minimum, maximum)).toBe(10)
})

it('string values should return a number', () => {
    const result = clamp('9', '18', '27')
    expect(typeof result).toBe('number')
})

it('returns maximum when maximum is less than minimum and value is more than maximum', ()=> {
    expect(clamp(3, 2, 1)).toBe(1)
});
it('returns value if value is more than minimum and less than maximum', () => {
    expect(clamp(minimum + 1, minimum, minimum + 2)).toBe(minimum + 1)
})
})


