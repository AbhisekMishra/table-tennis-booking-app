const { gql } = require('apollo-server');

const fields = `
    startDate: Date
    endDate: Date
    userId: Int
`;

export default gql`
  scalar Date

  extend type Mutation {
    book(data: BookingInput!): Booking
    delete(id: Int!): Int
  }

  input BookingInput {
    ${fields}
  }

  type Booking {
    id: Int!
    ${fields}
  }
`;