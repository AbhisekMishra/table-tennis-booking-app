import apollo from '../../utils/apollo';

import {
    loginQuery,
    createUserMutation,
} from './user.gql';

const login = (username, password) =>
    apollo.query({
        query: loginQuery,
        variables: { username, password },
    });

const createUser = (data) =>
    apollo.mutate({
        mutation: createUserMutation,
        variables: { data },
    });

export { login, createUser };
