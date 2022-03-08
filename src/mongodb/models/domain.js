
const mongoose = require('mongoose');

const DomainSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  status: {
    required: true,
    type: String
  },
  customer: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
});

module.exports = mongoose.model('Domain', DomainSchema);