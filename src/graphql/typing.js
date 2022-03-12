
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Customer {
    name: String!,
    status: String!,
    type: String!,
    id: String!,
  },
  type Domain {
    name: String!,
    status: String!,
    id: String!,
    customer: Customer!,
  },
  type User {
    id: String!,
    username: String!,
    name: String!,
    type: String!,
    email: String!,
    customer: Customer,
    domains: [Domain!],
  },
  type Query {
    customer(name: String, id: String): Customer,
    customers(status: String, type: String): [Customer!],
    customerCount(status: String, type: String): Int!,
    generateCustomerTokens(customerID: String!): [String],
    domain(name: String, id: String): Domain,
    domains(status: String, customer: String): [Domain!],
    domainCount(status: String, customer: String): Int!,
    user(username: String, id: String): User,
    users(customer: String, domain: String, type: String): [User!],
    userCount(type: String, customer: String, domain: String): Int!,
  },
  type Mutation {
    addCustomer(name: String!, type: String!, usertype: String!, username: String!, email: String!, password: String!): Customer,
    removeCustomer(id: String!, name: String!): Customer,
    updateCustomerType(id: String!, newType: String!): Customer,
    updateCustomerStatus(id: String!, newStatus: String!): Customer,
    updateCustomerName(id: String!, newName: String!): Customer,
    addDomain(name: String!, customer: String!): Domain!,
    removeDomain(id: String!, name: String!): Domain,
    updateDomainStatus(id: String!, newStatus: String!): Domain,
    updateDomainName(id: String!, newName: String!): Domain,
    addUser(name: String!, username: String!, email: String!, password: String!, type: String!, domain: String, customer: String): User,
    removeUser(username: String!, id: String!): User,
    updateUserName(id: String!, newUsername: String!): User,
    updateUserPhone(id: String!, newPhone: String!): User,
    updateUserEmail(id: String!, newEmail: String!): User,
    updateUserPassword(id: String!, oldPW: String!, newPW: String!): User,
    updateUserDomains(id: String!, action: String!, domain: String!): User,
  }
`;

module.exports = typeDefs;