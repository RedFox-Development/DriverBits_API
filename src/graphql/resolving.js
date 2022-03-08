
const jwt = require('jsonwebtoken');

const config = require('../tools/config');

const Customer = require('../mongodb/models/customer');
const Domain = require('../mongodb/models/domain');

const hash = (password) => {
  return bcrypt.hash(password, 10);
};

const STATUS_OPT = Object.freeze({CLOSED: 'CLOSED', DEACTIVATED: 'DEACTIVATED', PENDING: 'PENDING', ACTIVATED: 'ACTIVATED'});
const TYPE_OPT = Object.freeze({PREEMIUM: 'PREEMIUM', PRIVATE_FREE: 'FREE', PRIVATE_PREMIUM: 'PREMIUM', CORPORATE: 'CORPORATE'});

const checkMastery = (key = null) => {
  return key && key === config.masterkey
    ? true
    : false;
};

const resolvers = {
  Customer: {
    id: (root) => root['_id'],
    name: (root) => root.name,
    status: (root) => root.status,
    type: (root) => root.type,
  },
  Domain: {
    id: (root) => root['_id'],
    name: (root) => root.name,
    status: (root) => root.status,
    customer: (root) => root.customer,
  },
  Query: {
    customer: async (root, args) => {
      let customer = null;
      if (args.name) {
        customer = await Customer.findOne({name: args.name});
      } else if (args.id) {
        customer = await Customer.findOne({_id: args.id});
      }
      return customer;
    },
    customers: async (root, args) => {
      let customers = null;
      if (args.status) {
        customers = await Customer.find({status: args.status});
      } else if (args.type) {
        customers = await Customer.find({type: args.type});
      } else {
        customers = await Customer.find();
      }
      return customers;
    },
    customerCount: async (root, args) => {
      let count = 0;
      if (args.status) {
        count = await Customer.countDocuments({status: args.status});
      } else if (args.type) {
        count = await Customer.countDocuments({type: args.type});
      } else {
        count = await Customer.countDocuments();
      }
      return count;
    },
    domain: async (root, args) => {
      let domain = null;
      if (args.name) {
        domain = await Domain.findOne({name: args.name}).populate('customer');
      } else if (args.id) {
        domain = await Domain.findOne({_id: args.id}).populate('customer');
      }
      return domain;
    },
    domains: async (root, args) => {
      let domains = null;
      if (args.status) {
        domains = await Domain.find({status: args.status}).populate('customer');
      } else if (args.customer) {
        domains = await Domain.find({customer: args.customer}).populate('customer');
      } else {
        domains = await Domain.find().populate('customer');
      }
      return domains;
    },
    domainCount: async (root, args) => {
      let count = 0;
      if (args.status) {
        count = await Domain.countDocuments({status: args.status});
      } else if (args.customer) {
        count = await Domain.countDocuments({customer: args.customer});
      } else {
        count = await Domain.countDocuments();
      }
      return count;
    },
  },
  Mutation: {
    addCustomer: async (root, args) => {
      let customer;
      if (args.name && args.type) {
        customer = new Customer({
          name: args.name,
          status: STATUS_OPT.PENDING,
          type: args.type
        });
        try {
          await customer.save();
        } catch (e) {
          customer = null;
        }
        customer = await Customer.findOne({name: args.name});
        return customer;
      } else if (args.name) {
        customer = new Customer({
          name: args.name,
          status: STATUS_OPT.PENDING,
          type: TYPE_OPT.PRIVATE_FREE
        });
        try {
          customer = await customer.save();
        } catch (e) {
          customer = null;
        }
        return customer;
      } else {
        return null;
      }
    },
    removeCustomer: async (root, args) => {
      let customer = await Customer.findOne({_id: args.id});
      let domains = await Domain.find({customer: args.id});
      customer.status = STATUS_OPT.CLOSED;
      try {
        await customer.save();
        customer = await Customer.findOneAndDelete({_id: args.id, name: args.name});
        domains.forEach(async domain => await Domain.findOneAndDelete({_id: domain.id}));
      } catch (e) {}
      return customer;
    },
    updateCustomerType: async (root, args) => {
      let customer = await Customer.findOne({_id: args.id});
      customer.type = args.newType;
      try {
        await customer.save();
      } catch (e) {}
      customer = await Customer.findOne({_id: args.id});
      return customer;
    },
    updateCustomerStatus: async (root, args) => {
      let customer = await Customer.findOne({_id: args.id});
      customer.status = args.newStatus;
      try {
        await customer.save();
      } catch (e) {}
      customer = await Customer.findOne({_id: args.id});
      return customer;
    },
    updateCustomerName: async (root, args) => {
      let customer = await Customer.findOne({_id: args.id});
      customer.name = args.newName;
      try {
        await customer.save();
      } catch (e) {}
      customer = await Customer.findOne({_id: args.id});
      return customer;
    },
    addDomain: async (root, args) => {
      let domain = new Domain({
        name: args.name,
        status: STATUS_OPT.PENDING,
        customer: args.customer
      });
      try {
        await domain.save();
        domain = await Domain.findOne({name: args.name}).populate('customer');
      } catch (e) {
        domain = null;
      }
      return domain;
    },
    removeDomain: async (root, args) => {
      let domain = await Domain.findOne({_id: args.id});
      domain.status = STATUS_OPT.CLOSED;
      try {
        await domain.save();
        domain = await Domain.findOneAndDelete({_id: args.id, name: args.name}).populate('customer');
      } catch (e) {}
      return domain;
    },
    updateDomainStatus: async (root, args) => {
      let domain = await Domain.findOne({_id: args.id}).populate('customer');
      domain.status = args.newStatus;
      try {
        await domain.save();
      } catch (e) {}
      domain = Domain.findOne({_id: args.id}).populate('customer');
      return domain
    },
    updateDomainName: async (root, args) => {
      let domain = await Domain.findOne({_id: args.id}).populate('customer');
      domain.status = args.newName;
      try {
        await domain.save();
      } catch (e) {}
      domain = Domain.findOne({_id: args.id}).populate('customer');
      return domain
    },
  },
};

module.exports = resolvers;