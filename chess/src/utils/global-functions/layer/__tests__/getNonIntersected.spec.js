import getNonIntersected from '../functions/getNonIntersected';
import { responses } from '../functions/responses';

// intersected means in that case key sameness


 describe.skip('getNonIntersected function', () => {

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
         
        it.each([[{}], [{0: 3, a: 'b'}]])('will always return an bottomObj', (bottomObj) => {
            expect(getNonIntersected(bottomObj, {})).toEqual(bottomObj)
        })

         it('callback will be called as much times as many is keys in bottomObj (if the response is not responses.cancel))', () => {
             let bottomKeysCount = 0;
             for(let _item in bottomObj) {
                 bottomKeysCount++;
             }
             
            getNonIntersected(bottomObj, {}, () => callbackMock(responses.default));
            expect(callbackMock).toHaveBeenCalledTimes(bottomKeysCount)
         })

     })

     it('it returns object containing every property from both bottomObj and topObj if bottom and topObj dont have any same keys (not intersected) - without callback', () => {
         
         expect(getNonIntersected(bottomObj, topObj)).toEqual({...bottomObj, ...topObj})
     })

     describe(`bottomObj and topObj have intersected properties, resultObj not specified`, () => {


        describe('callback is specified', () => {
            it('callback should be called only once if it returns response.cancel on first iteration', () => {
                getNonIntersected(intersectedBottomObj, intersectedTopObj, () => callbackMock(responses.cancel));
                expect(callbackMock).toHaveBeenCalledTimes(1)
             })
             
            it.each([9, ''])('throws an error when callback returns something different than response', (invalidResponse) => {
                expect(() => getNonIntersected(intersectedBottomObj, intersectedTopObj, () => callbackMock(invalidResponse))).toThrow()
             })
    
             it('throws an error when callback do not return', () => {
                 const callback = function () {const x = 1}
                expect(() => getNonIntersected(intersectedBottomObj, intersectedTopObj, callback)).toThrow()
             })

             it.each`
              otherValue | topObj 
              ${7}       | ${intersectedTopObj} 
              ${true}    | ${{1: false, b: 22, c: 'shhhh'}} 
             `(`all keys of returned object should have the same value from response: responses.assignValue(this case: $otherValue if the same response on each iteration)`, ({otherValue, topObj}) => {
                let expectedObject = {};
                for(let item in topObj) {
                    expectedObject[item] = otherValue;
                }
                for(let item in bottomObj) {
                    expectedObject[item] = otherValue;
                }
                

                expect(
                   getNonIntersected(bottomObj, topObj, 
                     () => callbackMock(() => responses.assignValue(otherValue))))
                     .toEqual(expectedObject)
             })


             it('should return the same object as without callback if callback return always responses.default', () => {
                expect(getNonIntersected(intersectedBottomObj, intersectedTopObj,
                  () => callbackMock(responses.default)))
                .toEqual(
                   getNonIntersected(intersectedBottomObj, intersectedTopObj)
                )
             })


        })


        describe('callback NOT specified', () => {
            
       
            it('should return an empty object if response is responses.omit on every iteration', () => {
 
                expect(
                   getNonIntersected(
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
        
         it('will return only resultObj', () => {


            expect(getNonIntersected(
                bottomObj, 
                {}, 
                undefined, 
                resultObj))
            .toEqual(resultObj)
         })
      
     })


     describe('topObj and resultObj have properties', () => {

      describe('callback not specified', () => {

         it('will contain the intersected part with of bottom and top object if resultObj will have the same intersected part', () => {


            expect(getNonIntersected(
               intersectedBottomObj,
               intersectedTopObj,
                undefined, 
               intersectedResultObj))
            .toEqual(expect.objectContaining(intersectedPart))
         })

         
         it('will return all properties from all 3 object if they are not intersected together)', () => {

            expect(getNonIntersected(bottomObj, topObj, undefined, resultObj))
            .toEqual(expect.objectContaining({...bottomObj, ...topObj, ...resultObj}))
         })

      })


      describe('callback is specified', () => {
         it.each([responses.default, responses.omit, responses.cancel, () => responses.assignValue(100)])(
            'for %s response (every iteration) returned object will always contain properties from resultObj', (response) => {
               expect(getNonIntersected(intersectedBottomObj, intersectedTopObj, () => callbackMock(response), resultObj))
                           .toEqual(expect.objectContaining(resultObj))
            }
         )
      })
  }) 
 })