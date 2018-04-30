import gql from 'graphql-tag';
import { graphql, QueryProps } from 'react-apollo';
import { Post } from '../../../../server/src/generated/prisma';

export const allPostsQuery = gql`
  query {
    posts {
      id
      createdAt
      updatedAt
      caption
      pictureUrl
      author {
        id
        firstName
        lastName
      }
    }
  }
`;

interface AllPostsQuery {
  posts: Post[];
}

export interface WithAllPostsProps {
  data: QueryProps & AllPostsQuery;
}

export const withAllPosts = graphql(allPostsQuery, {
  options: () => ({variables: {}, fetchPolicy: 'cache-and-network'})
});