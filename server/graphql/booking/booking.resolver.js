import { book, updateBooking } from '../../modules/booking';
import constants from '../../constants';
import jwt from 'jsonwebtoken';

const { APP_SECRET } = constants;

export default {
  Mutation: {
    book,
    updateBooking,
    deleteBooking: async (_, { id }, { db }) => {
      const booking = await db.Booking.findOne({
        where: {
          id,
        },
      });

      if (booking) {
        await booking.destroy();
        return booking.id;
      }

      return null;
    },
  },
  Query: {
    bookingsByUserId: async (_, { }, { db, authToken }) => {
      const { userId } = jwt.verify(authToken, APP_SECRET);
      if (!userId) {
        throw new Error('AUTH_ERROR');
      }
      return db.Booking.findAll({
        where: { userId }, 
        order: [
          ['endDate', 'DESC'],
        ],
      });
    },
  },
};
