 import merge from '../functions/merge';
import { responses } from '../functions/responses';

 describe.skip('merge function', () => {
    let defaultBottomObj = {z: 5, d: true};
   const  defaultTopObj = {m: 'kk', 5: 55},
     callbackMock = jest.fn((response) => {
        if (typeof response === 'string') return response;
        return response();
      });


      beforeEach(() => {
         defaultBottomObj = {z: 5, d: true};
      })
 
     describe(' topObj is {}, resultObj is not specified', () => {
         
        it.each([[{}], [{0: 3, a: 'b'}]])('will always return bottom obj', (bottomObj) => {
            expect(merge(bottomObj, {})).toEqual(bottomObj)
        })

         it('callback will not be called any times (because topObj is empty)', () => {
            merge(defaultBottomObj, {}, () => callbackMock(responses.default));
            expect(callbackMock).not.toHaveBeenCalled()
         })

     })

     describe(`topObj have properties, resultObj not specified`, () => {


        describe('callback is specified', () => {
            it('callback should be called only once if it returns response.cancel on first iteration', () => {
                merge(defaultBottomObj, defaultTopObj, () => callbackMock(responses.cancel));
                expect(callbackMock).toHaveBeenCalledTimes(1)
             })
             
            it.each([9, ''])('throws an error when callback returns something different than response', (invalidResponse) => {
                expect(() => merge(defaultBottomObj, defaultTopObj, () => callbackMock(invalidResponse))).toThrow()
             })
    
             it('throws an error when callback do not return', () => {
                 const callback = function () {const x = 1}
                expect(() => merge(defaultBottomObj, defaultTopObj, callback)).toThrow()
             })

             it.each`
              otherValue | topObj 
              ${7}       | ${defaultTopObj} 
              ${true}    | ${{1: false, b: 22, c: 'shhhh'}} 
             `(`returned object should contain a value from response.assignValue($otherValue in that case) in keys where normally should be values from topObj ($topObj is that case) when callback always returns this value from response`, ({otherValue, topObj}) => {
                let expectedValuesInTopObj = {};
                for(let item in topObj) {
                    expectedValuesInTopObj[item] = otherValue;
                }

                expect(
                   merge(defaultBottomObj, topObj, 
                     () => responses.assignValue(otherValue)))
                     .toEqual(expect.objectContaining(expectedValuesInTopObj))
             })


             it('should return the same object as without callback if callback return always responses.default', () => {
                expect(merge(defaultBottomObj, defaultTopObj,
                  () => callbackMock(responses.default)))
                .toEqual(
                   merge(defaultBottomObj, defaultTopObj)
                )
             })


             it('should return only bottom object without keys that were intersected with topObj if return from callback is always responses.omit', () => {

               const bottomObj = {
                  a: 10,
                  k: 12
               },
               topObj = {
                  0: 'h',
                  9: 'g' 
               },
                intersectedPart = {
                  'one': Math.random() * 19,
                  "two": "nineteen"
               }

               expect(
                  merge(
                     {...bottomObj, ...intersectedPart}, 
                     {...topObj, ...intersectedPart}, 
                     () => callbackMock(responses.omit)))
                              .toEqual(bottomObj)

             })
        })


        describe('callback NOT specified', () => {
            
         it('returned object contains all properties from topObj', () => {
            expect(merge(defaultBottomObj, defaultTopObj)).toEqual(expect.objectContaining(defaultTopObj))
        })


        })
    

     })

     const defaultResultObj = {
        "k12": "lorem",
        55: false,
        "10b": "10b"
     }

     describe('topObj is {} and resultObj have properties', () => {
        
         it('will return bottomObj containing properties from resultObj (if the same keys value from resultObj - like {...bottomObj, ...resultObj})', () => {
            expect(merge(defaultBottomObj, {}, undefined, defaultResultObj))
            .toEqual({...defaultBottomObj, ...defaultResultObj})
         })
      
     })


     describe('topObj and resultObj have properties', () => {

      describe('callback not specified', () => {

         it('will return bottomObj with properties from resultObj even if topObj have the same keys with different values)', () => {

            const topObj = {};
            for(let item in defaultResultObj) {
               topObj[item] = Math.random();
            }

            expect(merge(defaultBottomObj, topObj, undefined, defaultResultObj))
            .toEqual(expect.objectContaining(defaultResultObj))
         })

         
         it('will return bottomObj containing all properties from topObj if they are not key intersected with resultObj)', () => {

            let notIntersectedTopObj = {
               'not-intersected-1': 10,
               'not-intersected-2': 20
            };
            let topObj = {};
            for(let item in defaultResultObj) {
               topObj[item] = Math.random();
            }
            topObj = Object.assign(topObj, notIntersectedTopObj)

            expect(merge(defaultBottomObj, topObj, undefined, defaultResultObj))
            .toEqual(expect.objectContaining(notIntersectedTopObj))
         })

      })


      describe('callback is specified', () => {
         it.each([responses.default, responses.omit, responses.cancel, () => responses.assignValue(100)])(
            'for %s response (every iteration) returned object will always contain properties from resultObj', (response) => {
               expect(merge(defaultBottomObj, defaultTopObj, () => {
                 if (typeof response === 'function') {
                    return response()
                 }
                 return response;
               } , defaultResultObj))
                           .toEqual(expect.objectContaining(defaultResultObj))
            }
         )
      })
  }) 
 })
 