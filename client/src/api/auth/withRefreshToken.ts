import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { ApolloQueryResult } from 'apollo-client';

const refreshTokenMutation = gql`
  mutation {
    refreshToken {
      token 
      userId
    }
  }
`;

interface RefreshTokenPayload {
  token: string;
  userId: string;
}

interface RefreshTokenMutation {
  refreshToken: RefreshTokenPayload;
}

export interface WithRefreshTokenProps {
  refreshToken: () => Promise<ApolloQueryResult<RefreshTokenMutation>>;
}

export const withRefreshToken = graphql(refreshTokenMutation, {
  props: ({ownProps, mutate}) => ({
    refreshToken: async (variables: {}) => {
      const options = {
        mutation: refreshTokenMutation,
        variables
      };

      if (!mutate) {
        throw new Error('withRefreshToken: missing mutate');
      }

      return mutate(options);
    }
  })
});