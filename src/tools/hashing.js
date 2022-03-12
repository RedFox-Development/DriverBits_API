
const bcrypt = require('bcrypt');

const hash = (password) => {
  return bcrypt.hash(password, 10);
};

module.exports = hash;