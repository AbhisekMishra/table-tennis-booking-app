import types from './types';
import { bookingsByUserId, deletebooking, updateBooking, book } from '../../graphql/booking/booking.apollo';
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

const setBookingData = payload => ({
  type: types.SET_BOOKING_DATA,
  payload,
})

const setIsUpdating = payload => ({
  type: types.SET_IS_UPDATING,
  payload,
})

const clearBookingData = () => ({
  type: types.CLEAR_BOOKING_DATA,
})

const getBookingsByUser = () => {
  return (dispatch) => {
      return bookingsByUserId().then(res => {
        if(res.data.bookings) {
          dispatch(setMyBookingsData(res.data.bookings));
          return true;
        } else {
          dispatch(handleError(res.errors[0].message));
        }
      }).catch(err => {
        console.log(err);
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

const updateBookingById = (id, data) => {
  return (dispatch) => {
      return updateBooking(id, data).then(res => {
          if(res.data.booking) {
            dispatch(setIsUpdating(false));
            dispatch(clearBookingData());
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

const makeBooking = (data) => {
  return (dispatch) => {
      return book(data).then(res => {
          if(res.data.booking) {
            // dispatch(deleteBookingData(res.data.booking));
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

export { getBookingsByUser, cancelBooking, updateBookingById, makeBooking, setBookingData, setIsUpdating };