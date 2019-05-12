const { gql } = require('apollo-server');

const fields = `
    startDate: Date
    endDate: Date
    userId: Int
`;

export default gql`
  scalar Date

  extend type Query {
    bookingsByUserId: [Booking]
  }

  extend type Mutation {
    book(data: BookingInput!): Booking
    updateBooking(id: Int!, data: BookingInput!): Booking
    deleteBooking(id: Int!): Int
  }

  input BookingInput {
    ${fields}
  }

  type Booking {
    id: Int!
    createdAt: Date
    ${fields}
  }
`;