import apollo from '../../utils/apollo';

import {
    bookingsByUserIdQuery,
    deleteBookingMutation,
    updateBookingMutation,
} from './booking.gql';

const bookingsByUserId = (userId) =>
    apollo.query({
        query: bookingsByUserIdQuery,
        variables: { userId },
    });

const deletebooking = (id) =>
    apollo.mutate({
        mutation: deleteBookingMutation,
        variables: { id },
    });

const updateBooking = (id, data) =>
    apollo.mutate({
        mutation: updateBookingMutation,
        variables: { id, data },
    });

export { bookingsByUserId, deletebooking, updateBooking };
