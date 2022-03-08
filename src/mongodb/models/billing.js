
const mongoose = require('mongoose');

const BillingSchema = new mongoose.Schema({
  status: { required: true, type: String },
  type: { required: true, type: String },
  total: { required: true, type: Number },
  exVAT: { required: true, type: Number },
  VAT: { required: true, type: Number },
  due: { required: true, type: Number },
  valid: { required: true, type: Number },
  customer: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }
});

module.exports = mongoose.model('Billing', BillingSchema);