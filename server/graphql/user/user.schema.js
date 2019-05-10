const { gql } = require('apollo-server');

const fields = `
    username: String
    password: String
    firstName: String
    lastName: String
`;

export default gql`
  extend type Query {
    login(username: String!, password: String!): AuthPayload
    logout(token: String!, id: Int!): Int
  }

  extend type Mutation {
    createUser(data: UserInput!): AuthPayload
  }

  input UserInput {
    ${fields}
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: Int!
    ${fields}
  }
`;