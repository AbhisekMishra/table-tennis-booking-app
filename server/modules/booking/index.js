import Sequelize from 'sequelize';
import moment from 'moment';

const { Op } = Sequelize;

const book = async (_, { data }, { db }) => {
    const bookingsInDateRange = await findBookingWithinDateRange(db, data);
    if (bookingsInDateRange.length > 0) {
        throw new Error('Selected time slot is not available.');
    }
    const bookingsByUser = await findBookingsByUserWithinSixtyMinutes(db, data);
    if(bookingsByUser.length > 0) {
        throw new Error('There should be a difference of 60 minutes between two of your bookings.');
    }
    return db.Booking.create(data);
};

const updateBooking = async (_, { id, data }, { db }) => {
    const booking = await db.Booking.findOne({where: {id}});
    if(!booking) {
        throw new Error('Booking ID not found');
    }
    if(!checkIfWithinTwoMinutes(booking)) {
        throw new Error('Booking can be only be updated within 2 minutes');
    }
    await booking.update(data);
    return booking;
};

const findBookingWithinDateRange = (db, data) => db.Booking.findAll({
    where: {
        [Op.or]: [
            {
                startDate: {
                    [Op.gte]: moment(data.startDate),
                    [Op.lte]: moment(data.endDate),
                }
            },
            {
                endDate: {
                    [Op.gte]: moment(data.startDate),
                    [Op.lte]: moment(data.endDate),
                }
            },
        ]
    }
});

const findBookingsByUserWithinSixtyMinutes = (db, data) => db.Booking.findAll({
    where: {
        userId: data.userId,
        [Op.or]: [
            {
                startDate: {
                    [Op.gte]: moment(data.endDate).add(60, 'minutes')
                }
            },
            {
                endDate: {
                    [Op.lte]: moment(data.startDate).subtract(60, 'minutes')
                }
            }
        ],
    }
});

const checkIfWithinTwoMinutes = (booking) => moment().diff(booking.createdAt, "minutes") > 120;

export { book, updateBooking };