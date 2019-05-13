import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    appBar: {
        zIndex: '10000',
    },
    button: {
        margin: theme.spacing.unit,
    },
});

const handleLogoutClick = props => {
    const { logoutUser, history } = props;
    logoutUser();
    history.push('/');
};

const Header = props => {
    console.log(props);
    const { classes, userData } = props;
    console.log(props);
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Table Tennis booking App
                    </Typography>
                    {userData.token && <Button color="secondary" className={classes.button} onClick={() => handleLogoutClick(props)}>
                        Logout
                    </Button>}
                </Toolbar>
            </AppBar>
        </div>
    );
};

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Header));