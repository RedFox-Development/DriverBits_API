
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    required: true,
    unique: true,
    type: String
  },
  status: {
    required: true,
    type: String
  },
  type: {
    required: true,
    type: String
  }
});

module.exports = mongoose.model('Customer', CustomerSchema);