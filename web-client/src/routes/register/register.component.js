import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Formik, Field } from 'formik';
import { ComponentInput } from '../../components/FormikComponents';

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

function Register(props) {
    const { classes, registerUser, history } = props;

    return (
        <div className={classes.container}>
            <Grid container justify="center">
                <Grid item xs={12} sm={12} md={4}>
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3" className={classes.header}>
                            Register
                        </Typography>
                        <Formik
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                username: '',
                                password: '',
                                rePassword: '',
                            }}
                            onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
                                const registerData = {...values};
                                delete registerData['rePassword'];
                                registerUser(registerData).then(success => {
                                    if (success) {
                                        history.push('book');
                                    }
                                    setSubmitting(false);
                                });
                            }}
                            render={({ values, setFieldValue, setFieldTouched, handleSubmit, isSubmitting, isValid }) => (
                                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                    <Grid container justify="center">
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Field
                                                label="First Name"
                                                name="firstName"
                                                component={ComponentInput}
                                                className={classes.textField}
                                                margin="normal"
                                                validate={value => {
                                                    if (!value) {
                                                        return 'Required';
                                                    }
                                                    return null;
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Field
                                                label="Last Name"
                                                name="lastName"
                                                component={ComponentInput}
                                                className={classes.textField}
                                                margin="normal"
                                                validate={value => {
                                                    if (!value) {
                                                        return 'Required';
                                                    }
                                                    return null;
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Field
                                                label="Username"
                                                name="username"
                                                component={ComponentInput}
                                                className={classes.textField}
                                                margin="normal"
                                                validate={value => {
                                                    if (!value) {
                                                        return 'Required';
                                                    }
                                                    return null;
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Field
                                                label="Password"
                                                type="password"
                                                name="password"
                                                component={ComponentInput}
                                                className={classes.textField}
                                                margin="normal"
                                                validate={value => {
                                                    if (!value) {
                                                        return 'Required';
                                                    }
                                                    return null;
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Field
                                                label="Re-enter Password"
                                                type="password"
                                                name="rePassword"
                                                component={ComponentInput}
                                                className={classes.textField}
                                                margin="normal"
                                                disabled={!values.password}
                                                validate={value => {
                                                    if (!value) {
                                                        return 'Required';
                                                    }
                                                    if (value !== values.password) {
                                                        return "Passwords should match";
                                                    }
                                                    return null;
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Button variant="contained" color="primary" className={classes.button} type="submit" disabled={isSubmitting}>
                                                Register
                                        </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);