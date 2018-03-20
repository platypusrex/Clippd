import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { ApolloQueryResult } from 'apollo-client';
import { User } from '../../../../server/src/generated/prisma';

const registerUserMutation = gql`
  mutation ($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup (firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

export interface AuthPayload {
  token: string;
  user: User;
}

interface RegisterUserMutation {
  signup: AuthPayload;
}

interface RegisterUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface WithRegisterUserProps {
  registerUser: (input: RegisterUserInput) => Promise<ApolloQueryResult<RegisterUserMutation>>;
}

export const withRegisterUser = graphql(registerUserMutation, {
  props: ({ownProps, mutate}) => ({
    registerUser: async (variables: RegisterUserInput) => {
      const options = {
        mutation: registerUserMutation,
        variables
      };

      if (!mutate) {
        throw new Error('withRegisterUser: missing mutate');
      }

      return mutate(options);
    }
  })
});