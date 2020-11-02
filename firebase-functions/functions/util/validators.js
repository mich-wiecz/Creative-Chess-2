const isEmail = (email) => {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
  };
  
  const isEmpty = (string) => {
    if (string.trim() === '') return true;
     return false;
  };

  const MUST_NOT_EMPTY = 'Must not be empty'
  
  exports.validateSignupData = (data) => {
    let errors = {};
    console.log(data)
  
    if (isEmpty(data.email)) {
      errors.email = MUST_NOT_EMPTY;
    } else if (!isEmail(data.email)) {
      errors.email = 'Must be a valid email address';
    }
  
    if (isEmpty(data.password)) errors.password = MUST_NOT_EMPTY;
    if (data.password !== data.confirmPassword)
      errors.confirmPassword = 'Passwords must match';
    if (isEmpty(data.handle)) errors.handle = MUST_NOT_EMPTY;
  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };
  
  exports.validateLoginData = (data) => {
    let errors = {};
  
    if (isEmpty(data.email)) errors.email = MUST_NOT_EMPTY;
    if (isEmpty(data.password)) errors.password = MUST_NOT_EMPTY;
  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };
  
  exports.reduceUserDetails = (userDetails) => {
    let reducedDetails = {};
    for(let detail in userDetails) {
      const detailValue = userDetails[detail];
      if (Array.isArray(detailValue) && detail === "hobbies") {
        reducedDetails.hobbies = [];
        detailValue.forEach(item => {
          if (!isEmpty(item.trim())) 
          reducedDetails.hobbies.push(item);
        })
      } else {
        const trimmedValue = detailValue.trim();
        if (!isEmpty(trimmedValue)) 
        reducedDetails[detail] = trimmedValue;
      }
     
    }
  
    return reducedDetails;
  };