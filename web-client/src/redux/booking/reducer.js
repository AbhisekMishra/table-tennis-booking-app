import types from './types'

const initialState = {
  myBookings: [],
  bookingInfo: {},
  isUpdating: false,
};

function booking(state = initialState, action) {
  switch (action.type) {
    case types.SET_MY_BOOKINGS_DATA:
      return { ...state, myBookings: action.payload };
    case types.DELETE_BOOKING_DATA:
      return { ...state, myBookings: state.myBookings.filter(booking => booking.id !== action.payload) };
    case types.SET_BOOKING_DATA:
      return {...state, bookingInfo: action.payload};
    case types.SET_IS_UPDATING:
      return {...state, isUpdating: action.payload};
    case types.CLEAR_BOOKING_DATA:
      return {...state, bookingInfo: {}};
    default:
      return state
  }
}

export default booking;