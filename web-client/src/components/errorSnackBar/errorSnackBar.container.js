import { connect } from 'react-redux'
import ErrorSnackBar from './errorSnackBar.component';

const mapStateToProps = state => {
    return {
        error: state.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorSnackBar);