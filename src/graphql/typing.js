
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
  type Query {
    customer(name: String, id: String): Customer,
    customers(status: String, type: String): [Customer!],
    customerCount(status: String, type: String): Int!,
    domain(name: String, id: String): Domain,
    domains(status: String, customer: String): [Domain!],
    domainCount(status: String, customer: String): Int!,
  },
  type Mutation {
    addCustomer(name: String!, type: String!): Customer,
    removeCustomer(id: String!, name: String!): Customer,
    updateCustomerType(id: String!, newType: String!): Customer,
    updateCustomerStatus(id: String!, newStatus: String!): Customer,
    updateCustomerName(id: String!, newName: String!): Customer,
    addDomain(name: String!, customer: String!): Domain,
    removeDomain(id: String!, name: String!): Domain,
    updateDomainStatus(id: String!, newStatus: String!): Domain,
    updateDomainName(id: String!, newName: String!): Domain,
  }
`;

module.exports = typeDefs;