
const jwt = require('jsonwebtoken');

const config = require('../tools/config');

const { generate } = require('../tools/tokenhandler');

const Customer = require('../mongodb/models/customer');
const {
  addCustomer,
  countCustomers,
  findCustomer,
  findCustomers,
  removeCustomer,
  updateCustomerName,
  updateCustomerStatus,
  updateCustomerType
} = require('../mongodb/tools/customer');

const Domain = require('../mongodb/models/domain');
const {
  addDomain,
  countDomains,
  findDomain,
  findDomains,
  removeCustomerDomains,
  removeDomain,
  updateDomainName,
  updateDomainStatus
} = require('../mongodb/tools/domain');

const User = require('../mongodb/models/user');
const {
  addUser,
  countUsers,
  findUser,
  findUsers
} = require('../mongodb/tools/user');

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
  User: {
    id: (root) => root['_id'],
    username: (root) => root.username,
    name: (root) => root.name,
    type: (root) => root.type,
    email: (root) => root.email,
    customer: (root) => root.customer,
    domains: (root) => root.domains,
  },
  Query: {
    customer: async (root, args) => findCustomer({name: args.name, cid: args.id}),
    customers: async (root, args) => findCustomers({status: args.status, type: args.type}),
    customerCount: async (root, args) => countCustomers({status: args.status, type: args.type}),
    generateCustomerTokens: async (root, args) => {
      return null;
    },
    domain: async (root, args) => findDomain({name: args.name, did: args.id}),
    domains: async (root, args) => findDomains({status: args.status, cid: args.customer}),
    domainCount: async (root, args) => countDomains({status: args.status, cid: args.customer}),
    user: async (root, args) => await findUser({id: args.id, username: args.username}),
    users: async (root, args) => await findUsers({type: args.type, cid: args.customer, did: args.domain}),
    userCount: async (root, args) => await countUsers({type: args.type, cid: args.customer, did: args.domain}),
  },
  Mutation: {
    addCustomer: async (root, args) => {
      const customer = await addCustomer({name: args.name, type: args.type});
      console.log(customer);
      const domain = await addDomain({cid: customer._id, name: `${customer.name}-default`});
      console.log(domain);
      const user = await addUser({name: `${args.name} handler`, username: args.username, email: args.email, password: args.password, type: args.usertype, did: domain._id, cid: customer._id});
      console.log(user);
      return customer;
    },
    removeCustomer: async (root, args) => {
      const customer = await removeCustomer({cid: args.id, name: args.name});
      if (await removeCustomerDomains({cid: customer._id})) {
        return customer;
      } else {
        let replaced = new Customer({
          name: customer.name,
          status: STATUS_OPT.DEACTIVATED,
          type: customer.type,
          _id: customer._id
        });
        try {
          await replaced.save();
          replaced = await Customer.findOne({_id: customer._id});
        } catch (e) {
          replaced = null;
        }
        return replaced;
      }
    },
    updateCustomerType: async (root, args) => await updateCustomerType({cid: args.id, newType: args.newType}),
    updateCustomerStatus: async (root, args) => await updateCustomerStatus({cid: args.id, newStatus: args.newStatus}),
    updateCustomerName: async (root, args) => await updateCustomerName({cid: args.id, newName: args.newName}),
    addDomain: async (root, args) => await addDomain({name: args.name, cid: args.customer}),
    removeDomain: async (root, args) => await removeDomain({name: args.name, did: args.id}),
    updateDomainStatus: async (root, args) => await updateDomainStatus({did: args.id, newStatus: args.newStatus}),
    updateDomainName: async (root, args) => await updateDomainName({did: args.id, newName: args.newName}),
    addUser: async (root, args) => await addUser({name: args.name, username: args.username, email: args.email, password: args.password, type: args.type, did: args.domain, cid: args.customer}),
  },
};

module.exports = resolvers;