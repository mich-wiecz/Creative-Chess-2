import drawLots from '../drawLots';

describe('drawLots function', () => {
  Math.random = () => 0.99

    it('returns the minimum value if Math.random() will be 0', () => {
        Math.random = () => 0;
        expect(drawLots(1, 10, 1)).toBe(1)
        Math.random = () => .99;
    })

    it('return max value if Math.random is equal to nearly 1 (.99) when maximum is divisible by a step value', () => {
        expect(drawLots(1, 10, 1)).toBe(10)
        expect(drawLots(1, 10, 2)).toBe(10)
        expect(drawLots(1, 10, 5)).toBe(10)
    })


    it('return (maximum - (maximum % step)) if Math.random is equal to nearly 1 (.99) when maximum is not divisible by  step value', () => {
        expect(drawLots(1, 10, 3)).toBe(10 - (10 % 3))
        expect(drawLots(1, 10, 7)).toBe( 10 - (10 % 7))
    })

    it('throws error when step value is greater than the difference between maximum and minimum', () => {
        expect(() => drawLots( 1, 10, 19.5)).toThrowError()
    })

    it('throws error when step is 0 or less', () => {
        expect(() => drawLots( 1, 10, 0)).toThrowError()
        expect(() => drawLots( 1, 10, -1)).toThrowError()
    })

    it('throws error when minimum less than 0', () => {
        expect(() => drawLots( -1, 10, 1)).toThrowError()
    })

    it('NOT throws error when minimum is  0', () => {
        expect(() => drawLots( 0, 10, 1)).not.toThrowError()
    })

    it('throw error if maximum is less than minimum', () => {
        expect(() => drawLots( 2, 1, 1)).toThrowError()
    })
  
    it('throws error when maximum is 0 or less', () => {
        expect(() => drawLots( 1, 0, 1)).toThrowError()
        expect(() => drawLots( 1, -1, 11)).toThrowError()
    })
})
