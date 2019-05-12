import { connect } from 'react-redux';
import { makeBooking } from '../../../redux/booking/actions';
import MakeBooking from './makeBooking.component';

const mapStateToProps = state => {
    return {
        bookingInfo: state.booking.bookingInfo,
        error: state.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        makeBooking: val => {
            return dispatch(makeBooking(val))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MakeBooking);