import gql from 'graphql-tag';

const bookingsByUserIdQuery = gql`
  query bookingsByUserId($userId: Int!) {
    bookings: bookingsByUserId(userId: $userId) {
      id
      startDate
      endDate
      createdAt
    }
  }
`;

const deleteBookingMutation = gql`
  mutation deleteBooking($id: Int!) {
    booking: deleteBooking(id: $id)
  }
`;

const updateBookingMutation = gql`
  mutation updateBooking($id: Int!, $data: BookingInput!) {
    booking: updateBooking(id: $id, data: $data) {
      id
      startDate
      endDate
      createdAt
    }
  }
`;

const bookMutation = gql`
  mutation book($data: BookingInput!) {
    booking: book(data: $data) {
      id
      startDate
      endDate
      createdAt
    }
  }
`;

export { bookingsByUserIdQuery, deleteBookingMutation, updateBookingMutation, bookMutation };
