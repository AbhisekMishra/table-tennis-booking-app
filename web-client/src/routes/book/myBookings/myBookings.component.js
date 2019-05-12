import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const styles = theme => ({
    container: {
        marginTop: '5rem',
    },
    card: {
        minWidth: 275,
        marginTop: '1rem',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class MyBookings extends React.Component {
    componentDidMount() {
        this.props.getBookingsByUser(20);
    }
    handleDelete = (id) => {
        this.props.cancelBooking(id);
    }
    handleEditBtnClick = (bookingData) => {
        this.props.setIsUpdating(true);
        this.props.setBookingData(bookingData);
        this.props.history.push('/book/booking');
    }
    render() {
        const { classes, myBookings } = this.props;
        return (
            <div className={classes.container}>
                <Grid container justify="center">
                    <Grid item xs={12} sm={12} md={4}>
                        {myBookings.map(booking => (
                            <Card className={classes.card} key={booking.id}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {moment(booking.startDate).format('Do MMM YYYY')}
                                    </Typography>
                                    <Typography component="p">
                                        {`${moment(booking.startDate).format('h:mm A')} - ${moment(booking.endDate).format('h:mm A')}`}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {moment().isBefore(booking.startDate) && <Button variant="contained" color="secondary" onClick={() => this.handleDelete(booking.id)}>Cancel</Button>}
                                    {moment().diff(booking.createdAt, "minutes") <= 2 && <Button variant="contained" color="primary" onClick={() => this.handleEditBtnClick(booking)}>Edit</Button>}
                                </CardActions>
                            </Card>
                        ))}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(MyBookings);