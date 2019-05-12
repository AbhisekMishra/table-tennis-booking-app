import Sequelize from 'sequelize';
import moment from 'moment';
import constants from '../../constants';
import jwt from 'jsonwebtoken';

const { APP_SECRET } = constants;

const { Op } = Sequelize;

const book = async (_, { data }, { db, authToken }) => {
    if (authToken === 'null') {
        throw new Error('AUTH_ERROR');
    }
    const { id } = jwt.verify(authToken, APP_SECRET);
    if (!id) {
        throw new Error('AUTH_ERROR');
    }
    const payload = { ...data, userId: id };
    // Check if user has booked within 60 mins
    const bookingsByUser = await hasUserBookedWithinSixtyMinutes(db, payload);
    if (bookingsByUser) {
        throw new Error('There should be a difference of 60 minutes between two of your bookings.');
    }
    // Check if time slot difference is max of 60 mins
    const selectedTimeSlotsDifference = getSelectedTimeSlotsDifference(payload);
    if (selectedTimeSlotsDifference) {
        throw new Error('Time slots should be between 10 - 60 mins.');
    }
    // Check if time slot is available
    const bookingsInDateRange = await findBookingWithinDateRange(db, payload);
    if (bookingsInDateRange.length > 0) {
        throw new Error('Selected time slot is not available.');
    }
    return db.Booking.create(payload);
};

const updateBooking = async (_, { id, data }, { db, authToken }) => {
    if (authToken === 'null') {
        throw new Error('AUTH_ERROR');
    }
    const { id: userId } = jwt.verify(authToken, APP_SECRET);
    if (!id) {
        throw new Error('AUTH_ERROR');
    }
    const payload = { ...data, userId };
    const booking = await db.Booking.findOne({ where: { id } });
    if (!booking) {
        throw new Error('Booking ID not found');
    }
    if (checkIfWithinTwoMinutes(booking)) {
        throw new Error('Booking can be only be updated within 2 minutes');
    }
    await booking.update(payload);
    return booking;
};

const findBookingWithinDateRange = (db, data) => db.Booking.findAll({
    where: {
        [Op.or]: [
            {
                startDate: {
                    [Op.eq]: moment.utc(data.startDate).format(),
                }
            },
            {
                endDate: {
                    [Op.eq]: moment.utc(data.endDate).format(),
                }
            },
            {
                startDate: {
                    [Op.lt]: moment.utc(data.startDate).format(),
                },
                endDate: {
                    [Op.gt]: moment.utc(data.startDate).format(),
                }
            },
            {
                startDate: {
                    [Op.lt]: moment.utc(data.endDate).format(),
                },
                endDate: {
                    [Op.gt]: moment.utc(data.endDate).format(),
                }
            },
            {
                startDate: {
                    [Op.gt]: moment.utc(data.startDate).format(),
                    [Op.lt]: moment.utc(data.endDate).format(),
                }
            },
            {
                endDate: {
                    [Op.gt]: moment.utc(data.startDate).format(),
                    [Op.lt]: moment.utc(data.endDate).format(),
                }
            },
        ]
    }
});

const hasUserBookedWithinSixtyMinutes = (db, data) => db.Booking.findAll({
    limit: 1,
    order: [['createdAt', 'DESC']],
    where: {
        userId: data.userId,
    }
}).then(entries => {
    if (entries.length === 0) {
        return false;
    }
    return moment.utc().diff(entries[0].createdAt, 'minutes') <= 60;
});

const checkIfWithinTwoMinutes = (booking) => moment.utc().diff(booking.createdAt, "minutes") > 2;

const getSelectedTimeSlotsDifference = data => moment(data.endDate).diff(data.startDate, "minutes") > 60;

export { book, updateBooking };