import gql from 'graphql-tag';

export const authPayload = gql`
  fragment authPayload on auth {
    token 
    user {
      id
    }
  }
`;