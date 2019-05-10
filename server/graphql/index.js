import { makeExecutableSchema, ApolloServer } from 'apollo-server-express';
import { linkSchema } from './link.schema';
import { userResolver, userSchema } from './user';
import { mergeResolvers } from '../utils/gq-helper';
import db from '../models';

const resolvers = mergeResolvers(userResolver);

const typeDefs = [
    linkSchema,
    userSchema,
];

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default new ApolloServer({
    schema,
    debug: false,
    context: (params) => ({
        db,
        logger: params.req.log,
        logErrors: (errors, logger) => {
            (errors || []).forEach((err) => logger.error({ err }, 'Query failed'));
        },
    }),
});