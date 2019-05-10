import constants from '../constants';
import { makeBooking } from '../../modules/booking';

export default {
  Mutation: {
    book: makeBooking,
  },
};
