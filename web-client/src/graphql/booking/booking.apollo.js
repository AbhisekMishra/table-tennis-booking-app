import apollo from '../../utils/apollo';

import {
    bookingsByUserIdQuery,
    deleteBookingMutation,
    updateBookingMutation,
    bookMutation,
} from './booking.gql';

const bookingsByUserId = () =>
    apollo.query({
        query: bookingsByUserIdQuery,
        // variables: { userId },
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

const book = (data) =>
    apollo.mutate({
        mutation: bookMutation,
        variables: { data },
    });

export { bookingsByUserId, deletebooking, updateBooking, book };
