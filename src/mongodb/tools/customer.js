
const Customer = require('../models/customer');

const STATUS_OPT = Object.freeze({CLOSED: 'CLOSED', DEACTIVATED: 'DEACTIVATED', PENDING: 'PENDING', ACTIVATED: 'ACTIVATED'});
const TYPE_OPT = Object.freeze({PREEMIUM: 'PREEMIUM', PRIVATE_FREE: 'FREE', PRIVATE_PREMIUM: 'PREMIUM', CORPORATE: 'CORPORATE'});

const addCustomer = async ({name, type}) => {
  let customer = new Customer({
    name: name,
    type: type,
    status: STATUS_OPT.PENDING
  });
  try {
    await customer.save();
    customer = await Customer.findOne({name: name});
  } catch (e) {
    console.warn(e);
    customer = null;
  }
  return customer;
};

const countCustomers = async ({status = null, type = null}) => {
  let count = 0;
  if (status) {
    count = await Customer.countDocuments({status: status});
  } else if (type) {
    count = await Customer.countDocuments({type: type});
  } else {
    count = await Customer.countDocuments();
  }
  return count;
};

const findCustomer = async ({name = null, cid = null}) => {
  let customer = null;
  if (name) {
    customer = await Customer.findOne({name: name});
  } else if (cid) {
    customer = await Customer.findOne({_id: cid});
  }
  return customer;
};

const findCustomers = async ({status = null, type = null}) => {
  let customers = null;
  if (status) {
    customers = await Customer.find({status: status});
  } else if (type) {
    customers = await Customer.find({type: type});
  } else {
    customers = await Customer.find();
  }
  return customers;
};

const removeCustomer = async ({cid, name}) => {
  let customer = await Customer.findOne({_id: cid});
  customer.status = STATUS_OPT.CLOSED;
  try {
    await customer.save();
    customer = await Customer.findOneAndDelete({_id: cid, name: name});
  } catch (e) {
    console.warn(e);
    customer = null;
  }
  return customer;
};

const updateCustomerName = async ({cid, newName}) => {
  let customer = await Customer.findOne({_id: cid});
  customer.name = newName;
  try {
    await customer.save();
    customer = await Customer.findOne({_id: cid});
  } catch (e) {
    console.warn(e);
    customer = null;
  }
  return customer;
};

const updateCustomerStatus = async ({cid, newStatus}) => {
  let customer = await Customer.findOne({_id: cid});
  customer.status = newStatus;
  try {
    await customer.save();
    customer = await Customer.findOne({_id: cid});
  } catch (e) {
    console.warn(e);
    customer = null;
  }
  return customer;
};

const updateCustomerType = async ({cid, newType}) => {
  let customer = await Customer.findOne({_id: cid});
  customer.type = newType;
  try {
    await customer.save();
    customer = await Customer.findOne({_id: cid});
  } catch (e) {
    console.warn(e);
    customer = null;
  }
  return customer;
};

module.exports = {
  addCustomer,
  countCustomers,
  findCustomer,
  findCustomers,
  removeCustomer,
  updateCustomerName,
  updateCustomerStatus,
  updateCustomerType
};