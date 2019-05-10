const { gql } = require('apollo-server');

const fields = `
    username: String
    password: String
    firstName: String
    lastName: String
`;

export default gql`
  extend type Query {
    userByUsernamePassword(username: String!, password: String!): User
  }

  extend type Mutation {
    createUser(data: UserInput!): User
  }

  input UserInput {
    ${fields}
  }

  type User {
    id: ID!
    ${fields}
  }
`;