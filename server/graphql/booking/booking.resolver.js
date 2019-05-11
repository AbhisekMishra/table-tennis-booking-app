import { book, updateBooking } from '../../modules/booking';

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
    bookingsByUserId: async (_, { userId }, { db }) => {
      return db.Booking.findAll({
        where: { userId }, 
        order: [
          ['createdAt', 'DESC'],
        ],
      });
    },
  },
};
