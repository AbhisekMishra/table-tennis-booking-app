import Sequelize from 'sequelize';
import moment from 'moment';

const { Op } = Sequelize;

const book = async (_, { data }, { db }) => {
    // Check if user has 
    const bookingsByUser = await hasUserBookedWithinSixtyMinutes(db, data);
    if(!bookingsByUser) {
        throw new Error('There should be a difference of 60 minutes between two of your bookings.');
    }
    const selectedTimeSlotsDifference = getSelectedTimeSlotsDifference(data);
    if(selectedTimeSlotsDifference) {
        throw new Error('Time slots should be between 10 - 60 mins.');
    }
    const bookingsInDateRange = await findBookingWithinDateRange(db, data);
    if (bookingsInDateRange.length > 0) {
        throw new Error('Selected time slot is not available.');
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
    order: [ [ 'createdAt', 'DESC' ]],
    where: {
        userId: data.userId,
    }
}).then(entries => {
    if(entries.length === 0) {
        return false;
    }
    return moment.utc().diff(entries[0].createdAt, 'minutes') > 60;
});

const checkIfWithinTwoMinutes = (booking) => moment.utc().diff(booking.createdAt, "minutes") > 120;

const getSelectedTimeSlotsDifference = data => moment(data.endDate).diff(data.startDate, "minutes") > 60;

export { book, updateBooking };