import { connect } from 'react-redux';
import { getBookingsByUser, cancelBooking, setBookingData, setIsUpdating } from '../../../redux/booking/actions';
import MyBookings from './myBookings.component';

const mapStateToProps = state => {
    return {
        myBookings: state.booking.myBookings,
        error: state.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBookingsByUser: val => {
            return dispatch(getBookingsByUser(val))
        },
        cancelBooking: val => {
            return dispatch(cancelBooking(val))
        },
        setBookingData: val => {
            return dispatch(setBookingData(val))
        },
        setIsUpdating: val => {
            return dispatch(setIsUpdating(val))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyBookings);