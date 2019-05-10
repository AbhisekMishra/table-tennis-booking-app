import Sequelize from 'sequelize';
import moment from 'moment';

const { Op } = Sequelize;

const makeBooking = async (_, { data }, { db }) => {
    const bookings = await findBookingWithinDateRange(db, data);
    if (bookings.length > 0) {
        throw new Error('Selected time slot is not available');
    }
    return db.Booking.create(data);
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

export { makeBooking };