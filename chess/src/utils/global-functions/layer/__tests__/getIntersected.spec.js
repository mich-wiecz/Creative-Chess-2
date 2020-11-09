import getIntersected from '../functions/getIntersected';
import { responses } from '../functions/responses';

// intersected means in that case key sameness


 describe.skip('getIntersected function', () => {

    let bottomObj = {
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
     },
     intersectedBottomObj = {
         ...bottomObj,
         ...intersectedPart
     },
     intersectedTopObj = {
         ...topObj,
         ...intersectedPart
     }


  
  const  callbackMock = jest.fn((response) => {
        if (typeof response === 'string') return response;
        return response();
      });


      beforeEach(() => {
        bottomObj = {
            a: 10,
            k: 12
         };
         intersectedBottomObj = {
            ...bottomObj,
            ...intersectedPart
         }
      })
 
     describe(' topObj is {}, resultObj is not specified', () => {
         
        it.each([[{}], [{0: 3, a: 'b'}]])('will always return an empty object', (bottomObj) => {
            expect(getIntersected(bottomObj, {})).toEqual({})
        })

         it('callback will not be called any times (because topObj is empty)', () => {
            getIntersected(bottomObj, {}, () => callbackMock(responses.default));
            expect(callbackMock).not.toHaveBeenCalled()
         })

     })

     it('it returns empty object ({}) if bottom and topObj dont have any same keys (not intersected) - without callback', () => {
         expect(getIntersected(bottomObj, topObj)).toEqual({})
     })

     describe(`bottomObj and topObj have intersected properties, resultObj not specified`, () => {


        describe('callback is specified', () => {
            it('callback should be called only once if it returns response.cancel on first iteration', () => {
                getIntersected(intersectedBottomObj, intersectedTopObj, () => callbackMock(responses.cancel));
                expect(callbackMock).toHaveBeenCalledTimes(1)
             })
             
            it.each([9, ''])('throws an error when callback returns something different than response', (invalidResponse) => {
                expect(() => getIntersected(intersectedBottomObj, intersectedTopObj, () => callbackMock(invalidResponse))).toThrow()
             })
    
             it('throws an error when callback do not return', () => {
                 const callback = function () {const x = 1}
                expect(() => getIntersected(intersectedBottomObj, intersectedTopObj, callback)).toThrow()
             })

             it.each`
              otherValue | topObj 
              ${7}       | ${intersectedTopObj} 
              ${true}    | ${{1: false, b: 22, c: 'shhhh'}} 
             `(`returned object should contain all keys from topObj with values from response: responses.assignValue(this case $otherValue)) if this response will be returned on every iteration`, ({otherValue, topObj}) => {
                let expectedValuesInTopObjKeys = {};
                for(let item in topObj) {
                    expectedValuesInTopObjKeys[item] = otherValue;
                }
                
                expect(
                   getIntersected(topObj, topObj, 
                     () => callbackMock(() => responses.assignValue(otherValue))))
                     .toEqual(expect.objectContaining(expectedValuesInTopObjKeys))
             })


             it('should return the same object as without callback if callback return always responses.default', () => {
                expect(getIntersected(intersectedBottomObj, intersectedTopObj,
                  () => callbackMock(responses.default)))
                .toEqual(
                   getIntersected(intersectedBottomObj, intersectedTopObj)
                )
             })


        })


        describe('callback NOT specified', () => {
            
       
            it('should return an empty object if response is responses.omit on every iteration', () => {
 
                expect(
                   getIntersected(
                      intersectedBottomObj, 
                      intersectedTopObj, 
                      () => callbackMock(responses.omit)))
                               .toEqual({})
 
              })


        })
    

     })

     const resultObj = {
        "k12": "lorem",
        55: false,
        "10b": "10b"
     }

     const intersectedResultObj = {
         ...resultObj,
         ...intersectedPart
     }

     describe('topObj is {} and resultObj have properties', () => {
        
         it('returns exactly resultObj', () => {
            expect(getIntersected(intersectedBottomObj, {}, undefined, resultObj))
            .toEqual(resultObj)
         })
      
     })


     describe('topObj and resultObj have properties', () => {

      describe('callback not specified', () => {

         it('will contain the intersected part with  values from resultObj if all 3 have the same intersected part (I mean same keys, different values))', () => {

            const intersectedPartForBottomObj = {
                0: 0,
                1: 1
            },
            intersectedPartForTopObj = {
                0: true,
                1: false
            },
            intersectedPartForResultObj = {
                0: 'in',
                1: 'on'
            }

            expect(getIntersected(
                {...bottomObj, ...intersectedPartForBottomObj}, 
                {...topObj, ...intersectedPartForTopObj}, 
                undefined, 
                {...resultObj, ...intersectedPartForResultObj}))
            .toEqual(expect.objectContaining(intersectedPartForResultObj))
         })

         
         it('will return intersection between bottomObj and topObj when resultObj is not intersected)', () => {

            expect(getIntersected(intersectedBottomObj, intersectedTopObj, undefined, resultObj))
            .toEqual(expect.objectContaining(intersectedPart))
         })

      })


      describe('callback is specified', () => {
         it.each([responses.default, responses.omit, responses.cancel, () => responses.assignValue(100)])(
            'for %s response (every iteration) returned object will always contain properties from resultObj', (response) => {
               expect(getIntersected(intersectedBottomObj, intersectedTopObj, () => callbackMock(response), resultObj))
                           .toEqual(expect.objectContaining(resultObj))
            }
         )
      })
  }) 
 })