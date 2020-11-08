const follow = require('../follow');

describe('follow function', () => {

    it('will return spy value if followedChange is 0', () => {
        const spy = 10, followedChange = 0;
        expect(follow(spy)(5, followedChange)).toBe(spy)
    })

    it('will not return 0 if followed + followedChange are equal to 0 when second argument to follow is not provided', () => {
        const followed = 10, followedChange = -10;
        expect(follow(5)(followed, followedChange)).not.toBe(0);
    })

    it('will not return 0 if followed + followedChange are equal to 0 when second argument to follow is "never zero" as default should be', () => {
        const followed = 10, followedChange = -10;
        expect(follow(5, "never zero")(followed, followedChange)).not.toBe(0);
    })

    it('will  return 0 if followed + followedChange are equal to 0 when second argument is boolean', () => {
        const followed = 10, followedChange = -10;
        expect(follow(5, true)(followed, followedChange)).toBe(0);
        expect(follow(5, false)(followed, followedChange)).toBe(0);
    })

    it("will return double value of spy if followed and followedChange are the same values", () => {
        const spy = 3, followed = 10, followedChange = 10;
        expect(follow(spy)(followed, followedChange)).toBe(spy * 2);
    })

    it("will return smaller value of spy if followedChange is minus", () => {
        const spy = 3, followed = 20, followedChange = -10;
        const newSpy = follow(spy)(followed, followedChange)
        expect(newSpy).toBeLessThan(spy);
    })


    it('will return double value of spy when spy is minus value and followed and followedChange are the same values', () => {
        const spy = -3, followed = -10, followedChange = -10;
        expect(follow(spy)(followed, followedChange)).toBe(spy * 2);
    })


})