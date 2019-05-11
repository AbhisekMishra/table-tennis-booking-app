import apollo from '../../utils/apollo';

import {
    bookingsByUserIdQuery,
    deleteBookingMutation,
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

export { bookingsByUserId, deletebooking };
