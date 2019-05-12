import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Formik, Field } from 'formik';
import { ComponentDatePicker, ComponentTimePicker } from '../../../components/FormikComponents';
import moment from 'moment';

const styles = theme => ({
    container: {
        marginTop: '5rem',
    },
    root: {
        ...theme.mixins.gutters(),
        padding: theme.spacing.unit * 2,
    },
    pickers: {
        width: '100%',
        marginTop: '1rem',
    },
    button: {
        marginTop: '1rem',
        width: '100%'
    },
    header: {
        textAlign: 'center',
    },
});

class MakeBooking extends React.Component {
    state = {
        startDate: undefined,
        startTime: undefined,
        endTime: undefined,
    };
    static getDerivedStateFromProps(props, state) {
        const { bookingInfo, isUpdating } = props;
        if (isUpdating) {
            const { startDate, endDate } = bookingInfo;
            return { startDate, startTime: startDate, endTime: endDate };
        }
        return {};
    }
    getDerivedDate = (date, time) => {
        return moment(`${moment(date).format('YYYY-MM-DD')} ${moment(time).format('h:mm:ss A')}`, 'YYYY-MM-DD h:mm:ss A').format();
    }
    render() {
        console.log(this.props);
        const { classes, makeBooking, history, isUpdating, bookingInfo, updateBookingById } = this.props;
        const { startDate, startTime, endTime } = this.state;
        return (
            <div className={classes.container}>
                <Grid container justify="center">
                    <Grid item xs={12} sm={12} md={4}>
                        <Paper className={classes.root} elevation={1}>
                            <Typography variant="h5" component="h3" className={classes.header}>
                                {isUpdating ? `Update Booking` : `Book table`}
                            </Typography>
                            <Formik
                                initialValues={{
                                    startDate: startDate ? new Date(startDate) : undefined,
                                    startTime: startTime ? new Date(startTime) : undefined,
                                    endTime: endTime ? new Date(endTime) : undefined,
                                }}
                                onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
                                    const { startDate: startDateForm, startTime, endTime } = values;
                                    const startDate = this.getDerivedDate(startDateForm, startTime);
                                    const endDate = this.getDerivedDate(startDateForm, endTime);
                                    if (!isUpdating) {
                                        makeBooking({ startDate, endDate }).then(success => {
                                            if (success) {
                                                history.push('/book');
                                            }
                                            setSubmitting(false);
                                        });
                                    } else {
                                        updateBookingById(bookingInfo.id, { startDate, endDate }).then(success => {
                                            if (success) {
                                                history.push('/book');
                                            }
                                            setSubmitting(false);
                                        });
                                    }
                                }}
                                render={({ values, handleSubmit, isSubmitting, isValid, setFieldValue, setFieldTouched }) => (
                                    <form noValidate autoComplete="off" onSubmit={handleSubmit} >
                                        <Grid container justify="center">
                                            <Grid item xs={12} sm={12} md={12}>
                                                <Field
                                                    label="Date"
                                                    name="startDate"
                                                    component={ComponentDatePicker}
                                                    okToConfirm={true}
                                                    className={classes.pickers}
                                                    dateDisabled={selectedDate => {
                                                        const isCurrentDate = moment(selectedDate).isAfter(
                                                            moment().subtract(1, 'day'),
                                                        );
                                                        return !isCurrentDate;
                                                    }}
                                                    onChange={value => {
                                                        setFieldValue('startDate', new Date(value));
                                                        setFieldTouched('startDate', true);
                                                    }}
                                                    validate={value => {
                                                        if (!value) {
                                                            return 'Required';
                                                        }
                                                        return null;
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Field
                                                    label="Start Time"
                                                    name="startTime"
                                                    component={ComponentTimePicker}
                                                    className={classes.pickers}
                                                    selectableMinutesInterval={10}
                                                    onChange={value => {
                                                        setFieldValue('startTime', new Date(value));
                                                        setFieldTouched('startTime', true);
                                                    }}
                                                    validate={value => {
                                                        if (!value) {
                                                            return 'Required';
                                                        }
                                                        return null;
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Field
                                                    label="End Time"
                                                    name="endTime"
                                                    component={ComponentTimePicker}
                                                    className={classes.pickers}
                                                    selectableMinutesInterval={10}
                                                    onChange={value => {
                                                        setFieldValue('endTime', new Date(value));
                                                        setFieldTouched('endTime', true);
                                                    }}
                                                    validate={value => {
                                                        if (!value) {
                                                            return 'Required';
                                                        }
                                                        if (values.startTime && moment(values.startTime).isAfter(value)) {
                                                            return "End Time should be after start time";
                                                        }
                                                        if (values.startTime && moment(values.startTime).isSame(value)) {
                                                            return "End Time should not be same start time";
                                                        }
                                                        return null;
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12}>
                                                <Button variant="contained" color="secondary" className={classes.button} type="submit" disabled={isSubmitting}>
                                                    {isUpdating ? `Update` : `Book`}
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
}

MakeBooking.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MakeBooking);