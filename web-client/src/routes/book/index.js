import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import HttpsIcon from '@material-ui/icons/Https';
import { Route } from 'react-router-dom';
import MakeBooking from './makeBooking';
import MyBookings from './myBookings';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
});

const Book = ({ match, classes, history }) => (
    <div>
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />
            <List>
                <ListItem button onClick={() => history.push('/book')}>
                    <ListItemIcon><ListIcon /></ListItemIcon>
                    <ListItemText primary='My Bookings' />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={() => history.push('/book/booking')}>
                    <ListItemIcon><HttpsIcon /></ListItemIcon>
                    <ListItemText primary='Make booking' />
                </ListItem>
            </List>
        </Drawer>
        <Route exact path={`${match.url}`} component={MyBookings} />
        <Route path={`${match.url}/booking`} component={MakeBooking} />
    </div>
);

export default withStyles(styles)(Book);
