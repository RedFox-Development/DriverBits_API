
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
    unique: true
  },
  pwhash: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  domains: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Domain' }]
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
});

module.exports = mongoose.model('User', UserSchema);