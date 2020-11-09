import isStringFigure from '../isFigure';

    describe.skip(`isStringFigure function`, () => {
        
        const isFigureMock = jest.fn((item) => isStringFigure(item))

        it('should return a boolean', () => {
            isFigureMock({});
            expect(isFigureMock).toReturnWith(expect.any(Boolean))
        })

        it('should return false if provided value is not a sting', () => {
            isFigureMock({})
            expect(isFigureMock).toReturnWith(false)
        })

        it('should return false if provided string do not contain 3 words/strings divided by space', () => {
            expect(isStringFigure('a b')).toBe(false);
            expect(isStringFigure('a b c d')).toBe(false)
        })

        it('should return false if the second word in the string is not a figure name', () => {
           expect(isStringFigure('a John c')).toBe(false);
           expect(isStringFigure('a Dog b')).toBe(false);
        })

    })
    