import  Layer from './layer';
export default  function layer (baseObj, cb, immutably = true) {
    if (immutably !== 'not-immutably') baseObj = {...baseObj};
    const result = cb(new Layer(baseObj));
    return result.bottomObj;
}
