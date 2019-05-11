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

export { bookingsByUserIdQuery, deleteBookingMutation };
