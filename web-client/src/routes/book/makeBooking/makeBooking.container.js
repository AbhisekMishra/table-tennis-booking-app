import { connect } from 'react-redux';
import { makeBooking, updateBookingById } from '../../../redux/booking/actions';
import MakeBooking from './makeBooking.component';

const mapStateToProps = state => {
    return {
        bookingInfo: state.booking.bookingInfo,
        isUpdating: state.booking.isUpdating,
        error: state.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        makeBooking: val => {
            return dispatch(makeBooking(val))
        },
        updateBookingById: (id, val) => {
            return dispatch(updateBookingById(id, val))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MakeBooking);