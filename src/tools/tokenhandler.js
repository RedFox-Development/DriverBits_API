
const {
  secret_r,
  secret_rw
} = require('../tools/config');

const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const createUserToken = ({forClient = 'mobile', user}) => {
  const readToken = jwt.sign(customer, secret_r);
  const writeToken = jwt.sign(customer, secret_rw);
  return [readToken, writeToken];
};

const checkCustomerTokenValidity = (token) => {
  let decodedToken = null;
  decodedToken = jwt.verify(token, secret_r);
  if (decodedToken.type) {
    return true;
  } else {
    decodedToken = jwt.verify(token, secret_rw);
    return decodedToken.type ? true : false;
  }
};

const checkCustomerTokenType = (token) => {
  let decodedToken = null;
  decodedToken = jwt.verify(token, secret_r);
  if (decodedToken.type) {
    return 'READ';
  } else {
    decodedToken = jwt.verify(token, secret_rw);
    return decodedToken.type ? 'WRITE' : null;
  }
};

module.exports = {
  generate: createUserToken,
  validity: checkCustomerTokenValidity,
  type: checkCustomerTokenType
};