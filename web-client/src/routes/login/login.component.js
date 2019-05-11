import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        marginTop: '5rem',
    },
    root: {
        ...theme.mixins.gutters(),
        padding: theme.spacing.unit * 2,
    },
    textField: {
        width: '100%',
    },
    button: {
        marginTop: '1rem',
        width: '100%'
    },
    header: {
        textAlign: 'center',
    },
});

function Login(props) {
    const { classes } = props;

    return (
        <div className={classes.container}>
            <Grid container justify="center">
                <Grid item xs={12} sm={12} md={4}>
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3" className={classes.header}>
                            Login
                        </Typography>
                        <form noValidate autoComplete="off">
                            <Grid container justify="center">
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        label="Username"
                                        className={classes.textField}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        className={classes.textField}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Button variant="contained" color="secondary" className={classes.button} type="submit">
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);