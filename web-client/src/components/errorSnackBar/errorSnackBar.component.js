import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});

class ErrorSnackbar extends React.Component {
    render() {
        const { error } = this.props;

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={error.showError}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{error.errorMessage}</span>}
            />
        );
    }
}

ErrorSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ErrorSnackbar);