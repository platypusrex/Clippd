import gql from 'graphql-tag';
import { graphql, QueryProps } from 'react-apollo';
import { User } from '../../../../server/src/generated/prisma';
import { allPostsQuery } from './withAllPosts';

const createPostMutation = gql`
  mutation ($caption: String!, $picture: Upload!) {
    createPost (caption: $caption, picture: $picture) {
      id
      createdAt
      updatedAt
      caption
      pictureUrl
      author {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

interface CreatePostMutation {
  createPost: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    caption: string;
    pictureUrl: string;
    author: User
  }
}

interface CreatePostInput {
  caption: string;
  picture: any;
}

export interface WithCreatePostProps {
  createPost: (input: CreatePostInput) => Promise<QueryProps<CreatePostMutation>>;
}

export const withCreatePost = graphql(createPostMutation, {
  props: ({ownProps, mutate}) => ({
    createPost: (variables: CreatePostInput) => {
      const options = {
        mutation: createPostMutation,
        variables,
        refetchQueries: [
          {query: allPostsQuery}
        ],
      };

      if (!mutate) {
        throw new Error('withCreatePost: missing mutate');
      }

      mutate(options);
    }
  })
});