import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import constants from '../constants';
import moment from 'moment';

const { APP_SECRET } = constants;

export default {
  Query: {
    login: async (_, { username, password }, { db }) => {
      const user = await db.User.findOne({ where: { username } });
      if (!user) {
        throw new Error('No such user found');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }

      // const token = jwt.sign({ userId: user.id }, APP_SECRET);
      const token = moment('2019-05-10T18:12:26+04:00').isBetween('2019-05-10T18:10:26+04:00', '2019-05-10T18:13:26+04:00');
      return {
        token,
        user,
      }
    },
  },
  Mutation: {
    createUser: async (_, { data }, { db }) => {
      console.log(data);
      const password = await bcrypt.hash(data.password, 10);
      const user = await db.User.create({ ...data, password });

      const token = jwt.sign({ userId: user.id }, APP_SECRET);

      return {
        token,
        user,
      }
    },
  },
};
