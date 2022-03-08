
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const MONGODB_URI = process.env.NODE_ENV !== 'production'
  ? process.env.MONGO_DEV
  : process.env.MONGO;

const PORT = process.env.PORT || 4010;
const SECRET_R = process.env.NODE_ENV !== 'production'
  ? process.env.SECRET_R_DEV
  : process.env.SECRET_R;

const SECRET_RW = process.env.NODE_ENV !== 'production'
  ? process.env.SECRET_RW_DEV
  : process.env.SECRET_RW;

const MASTER_KEY = process.env.MASTER_KEY;

module.exports = {
  mongo: MONGODB_URI, port: PORT, secret_r: SECRET_R, secret_rw: SECRET_RW, env: process.env.NODE_ENV, masterKey: MASTER_KEY
};