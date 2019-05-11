import gql from 'graphql-tag';

const loginQuery = gql`
  query login($username: String!, $password: String!) {
    loginData: login(username: $username, password: $password) {
        user {
            id
            firstName
            lastName
            username
        }
        token
    }
  }
`;

const createUserMutation = gql`
  mutation createUser($data: UserInput!) {
    loginData: createUser(data: $data) {
        user {
            id
            firstName
            lastName
            username
        }
        token
    }
  }
`;

export { loginQuery, createUserMutation };
