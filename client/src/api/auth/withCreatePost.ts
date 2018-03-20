import gql from 'graphql-tag';
import { graphql, QueryProps } from 'react-apollo';
import { User } from '../../../../server/src/generated/prisma';

const createPostMutation = gql`
  mutation ($caption: String!, $photo: Upload!) {
    createPost (caption: $caption, photo: $photo) {
      id
      createdAt
      updatedAt
      caption
      photoUrl
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
    photoUrl: string;
    author: User
  }
}

interface CreatePostInput {
  caption: string;
  photo: any;
}

interface WithCreatePostProps {
  createPost: (input: CreatePostInput) => Promise<QueryProps<CreatePostMutation>>;
}

export const withCreatePost = graphql(createPostMutation, {
  props: ({ownProps, mutate}) => ({
    createPost: (variables: CreatePostInput) => {
      const options = {
        mutation: createPostMutation,
        variables
      };

      if (!mutate) {
        throw new Error('withCreatePost: missing mutate');
      }

      mutate(options);
    }
  })
});