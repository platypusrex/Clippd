import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { ApolloQueryResult } from 'apollo-client';
import { AuthPayload } from './withRegister';

const loginUserMutation = gql`
  mutation ($email: String!, $password: String!) {
    login (email: $email, password: $password) {
      payload {
        token
        user {
          id
        }
      }
      error {
        field
        message
      }
    }
  }
`;

interface Login {
  payload?: AuthPayload;
  error?: {
    field: string;
    message: string;
  }
}

interface LoginUserMutation {
  login: Login
}

interface LoginUserInput {
  email: string;
  password: string;
}

export interface WithLoginUserProps {
  loginUser: (input: LoginUserInput) => Promise<ApolloQueryResult<LoginUserMutation>>;
}

export const withLoginUser = graphql(loginUserMutation, {
  props: ({ownProps, mutate}) => ({
    loginUser: async (variables: LoginUserInput) => {
      const options = {
        mutation: loginUserMutation,
        variables
      };

      if (!mutate) {
        throw new Error('withLoginUser: missing mutate');
      }

      return mutate(options);
    }
  })
});


