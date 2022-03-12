const Domain = require('../models/domain');

const STATUS_OPT = Object.freeze({CLOSED: 'CLOSED', DEACTIVATED: 'DEACTIVATED', PENDING: 'PENDING', ACTIVATED: 'ACTIVATED'});

const addDomain = async ({name, cid}) => {
  let domain = new Domain({
    name: name,
    status: STATUS_OPT.PENDING,
    customer: cid
  });
  try {
    await domain.save();
    domain = await Domain.findOne({name: name}).populate('customer');
  } catch (e) {
    console.warn(e);
  }
  return domain;
};

const countDomains = async ({status = null, cid = null}) => {
  let count = 0;
  if (status) {
    count = await Domain.countDocuments({status: status});
  } else if (cid) {
    count = await Domain.countDocuments({customer: cid});
  } else {
    count = await Domain.countDocuments();
  }
  return count;
};

const findDomain = async ({did = null, name= null}) => {
  let domain = null;
  if (name) {
    domain = await Domain.findOne({name: name}).populate('customer');
  } else if (did) {
    domain = await Domain.findOne({_id: did}).populate('customer');
  }
  return domain;
};

const findDomains = async ({status = null, cid = null}) => {
  let domains = null;
  if (status) {
    domains = await Domain.find({status: status}).populate('customer');
  } else if (cid) {
    domains = await Domain.find({customer: cid}).populate('customer');
  } else {
    domains = await Domain.find().populate('customer');
  }
  return domains;
};

const removeCustomerDomains = async ({cid}) => {
  let customerDomainsRemoved = false;
  const domains = await Domain.find({customer: cid});
  try {
    domains.forEach(async domain => await Domain.findOneAndRemove({_id: domain._id}));
    customerDomainsRemoved = true;
  } catch (e) {
    console.warn(e);
    customerDomainsRemoved = false;
  }
  return customerDomainsRemoved;
};

const removeDomain = async ({did, name}) => {
  let domain = await Domain.findOne({_id: did});
  domain.status = STATUS_OPT.CLOSED;
  try {
    await domain.save();
    domain = await Domain.findOneAndDelete({_id: did, name: name}).populate('customer');
  } catch (e) {
    console.warn(e);
    domain = null;
  }
  return domain;
};

const updateDomainName = async ({did, newName}) => {
  let domain = await Domain.findOne({_id: did}).populate('customer');
  domain.name = newName;
  try {
    await domain.save();
    domain = Domain.findOne({_id: did}).populate('customer');
  } catch (e) {
    console.warn(e);
    domain = null;
  }
  return domain;
};

const updateDomainStatus = async ({did, newStatus}) => {
  let domain = await Domain.findOne({_id: did}).populate('customer');
  domain.status = newStatus;
  try {
    await domain.save();
    domain = Domain.findOne({_id: did}).populate('customer');
  } catch (e) {
    console.warn(e);
    domain = null;
  }
  return domain;
};

module.exports = {
  addDomain,
  countDomains,
  findDomain,
  findDomains,
  removeCustomerDomains,
  removeDomain,
  updateDomainName,
  updateDomainStatus
};