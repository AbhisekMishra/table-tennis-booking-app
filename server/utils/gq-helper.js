function mergeResolvers(...resolvers) {
  const querySchema = {};
  const mutationSchema = {};
  const mergedSchema = {};

  resolvers.forEach(({ Query, Mutation, ...others }) => {
    Object.assign(querySchema, { ...Query });
    Object.assign(mutationSchema, { ...Mutation });
    Object.assign(mergedSchema, others);
  });

  return Object.assign(mergedSchema, { Query: querySchema }, { Mutation: mutationSchema });
}

module.exports = { mergeResolvers };
