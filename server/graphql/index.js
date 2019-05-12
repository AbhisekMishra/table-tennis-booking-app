import { makeExecutableSchema, ApolloServer } from 'apollo-server-express';
import { linkSchema } from './link.schema';
import { userResolver, userSchema } from './user';
import { bookingResolver, bookingSchema } from './booking';
import { mergeResolvers } from '../utils/gq-helper';
import db from '../models';

const resolvers = mergeResolvers(userResolver, bookingResolver);

const typeDefs = [
    linkSchema,
    userSchema,
    bookingSchema,
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
        authToken: params.req.headers.auth_token
    }),
});