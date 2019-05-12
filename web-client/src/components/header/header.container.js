import { connect } from 'react-redux'
import { logoutUser } from '../../redux/user/actions';
import Header from './header';

const mapStateToProps = state => {
    return {
        error: state.error,
        userData: state.userData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => {
            return dispatch(logoutUser())
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);