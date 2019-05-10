export default {
    Query: {
      userByUsernamePassword: async (_, { username, password }, { db }) => {
        return await db.User.findOne({ where: { username, password } });
      },
    },
    Mutation: {
      createUser: async (_, { data }, { db }) => {
        return await db.User.create(data);
      },
    },
  };
  