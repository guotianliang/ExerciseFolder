function curry2(fn,arr=[]){

  return (...next)=>((param)=>(fn.length===param.length?fn(...param):curry2(fn,param)))([...arr,...next])
}
curry = (originalFunction, initialParams = []) => {

  return (...nextParams) => {

    const curriedFunction = (params) => {

      if (params.length === originalFunction.length) {
        return originalFunction(...params);
      }

      return curry(originalFunction, params);
    };

    return curriedFunction([...initialParams, ...nextParams]);
  };
};