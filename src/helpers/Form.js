import validatejs from 'validate.js';

validatejs.validators.presence.options = {message: 'This field is required.'};
validatejs.validators.email.options = {message: 'Enter a valid email.'};

const createFormError = (form) => {
  const obj = {};
  Object.keys(form).forEach((key) => {
    obj[`${key}Error`] = '';
  });
  return obj;
};

const getFormFieldNames = (names) => {
  if (Array.isArray(names)) {
    return names;
  }

  if (typeof names === 'string') {
    return [names];
  }

  if (typeof names === 'object') {
    return Object.keys(names);
  }

  throw new Error('getFormFieldNames()', names);
};

const validate = (objNames, state, constraints) => {
  const errorObj = {};
  const names = getFormFieldNames(objNames) || [];

  const field = {};
  const constraint = {};
  names.forEach((name) => {
    field[name] = state[name];
    constraint[name] = constraints[name];
  });

  const result = validatejs.validate(field, constraint, {fullMessages: false}) || {};
  names.forEach((name) => {
    errorObj[`${name}Error`] = result[name] ? result[name][0] : '';
  });
  return errorObj;
};

const isEmptyOrUndefined = (value) => {
  return value === null || value === undefined || value === '';
};

const cleanObject = (obj) => {
  const clean = obj;
  const propNames = Object.getOwnPropertyNames(obj);
  propNames.forEach((propName) => {
    if (isEmptyOrUndefined(clean[propName])) {
      delete clean[propName];
    }
  });
  return clean;
};

export {createFormError, validate, cleanObject};
