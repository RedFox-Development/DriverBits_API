
const {
  secret_r,
  secret_rw
} = require('../tools/config');

const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

export const createCustomerTokens = (customer) => {
  let readToken = null;
  let writeToken = null;
  try {
    readToken = jwt.sign(customer, secret_r);
    writeToken = jwt.sign(customer, secret_rw);
  } catch (e) {
  }

  return customer === null ?? [readToken, writeToken];
};

export const checkDomainTokenValidity = (token) => {
  let decodedToken = null;
  decodedToken = jwt.verify(token, secret_r);
  if (decodedToken.type) {
    return true;
  } else {
    decodedToken = jwt.verify(token, secret_rw);
    return decodedToken.type ? true : false;
  }
};

export const checkDomainTokenType = (token) => {
  let decodedToken = null;
  decodedToken = jwt.verify(token, secret_r);
  if (decodedToken.type) {
    return 'READ';
  } else {
    decodedToken = jwt.verify(token, secret_rw);
    return decodedToken.type ? 'WRITE' : null;
  }
};