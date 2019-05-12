import types from './types'

const initialState = {
  myBookings: [],
  bookingInfo: {},
};

function booking(state = initialState, action) {
  switch (action.type) {
    case types.SET_MY_BOOKINGS_DATA:
      return { ...state, myBookings: action.payload };
    case types.DELETE_BOOKING_DATA:
      return { ...state, myBookings: state.myBookings.filter(booking => booking.id !== action.payload) };
    default:
      return state
  }
}

export default booking;