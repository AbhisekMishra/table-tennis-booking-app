import { connect } from 'react-redux'
import { registerUser } from '../../redux/user/actions';
import Register from './register.component';

const mapStateToProps = state => {
    return {
        error: state.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerUser: val => {
            return dispatch(registerUser(val))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);