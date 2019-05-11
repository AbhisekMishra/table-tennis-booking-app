import { connect } from 'react-redux'
import { loginUser } from '../../redux/user/actions';
import Login from './login.component';

const mapStateToProps = state => {
    return {
        app: state,
        error: state.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: val => {
            return dispatch(loginUser(val))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);