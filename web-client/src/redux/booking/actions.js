import types from './types';
import { bookingsByUserId, deletebooking } from '../../graphql/booking/booking.apollo';
import { handleError } from '../error/actions';

/*
 * action creators
 */

const setMyBookingsData = payload => ({
  type: types.SET_MY_BOOKINGS_DATA,
  payload,
});

const deleteBookingData = payload => ({
  type: types.DELETE_BOOKING_DATA,
  payload,
})

const getBookingsByUser = (userId) => {
  return (dispatch) => {
      return bookingsByUserId(userId).then(res => {
          if(res.data.bookings.length > 0) {
            dispatch(setMyBookingsData(res.data.bookings));
            return true;
          } else {
            dispatch(handleError(res.errors[0].message));
            return false;
          }
      }).catch(err => {
        if(Array.isArray(err)) {
          dispatch(handleError(err[0].message));
        } else {
          dispatch(handleError(err.message));
        }
      })
    }
}

const cancelBooking = (id) => {
  return (dispatch) => {
      return deletebooking(id).then(res => {
          if(res.data.booking) {
            dispatch(deleteBookingData(res.data.booking));
            return true;
          } else {
            dispatch(handleError(res.errors[0].message));
            return false;
          }
      }).catch(err => {
        if(Array.isArray(err)) {
          dispatch(handleError(err[0].message));
        } else {
          dispatch(handleError(err.message));
        }
      })
    }
}

export { getBookingsByUser, cancelBooking };