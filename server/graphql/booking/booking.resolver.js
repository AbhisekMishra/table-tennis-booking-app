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
      console.log(authToken);
      if(authToken === 'null') {
        throw new Error('AUTH_ERROR');
      }
      const { id } = jwt.verify(authToken, APP_SECRET);
      if (!id) {
        throw new Error('AUTH_ERROR');
      }
      return db.Booking.findAll({
        where: { userId: id }, 
        order: [
          ['endDate', 'DESC'],
        ],
      });
    },
  },
};
