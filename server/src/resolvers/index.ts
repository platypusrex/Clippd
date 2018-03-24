import { postQuery } from './Query/postQuery';
import { authMutation } from './Mutation/authMutation'
import { postMutation } from './Mutation/postMutation'
import { AuthPayload } from './AuthPayload'

export default {
  Query: {
    ...postQuery
  },
  Mutation: {
    ...authMutation,
    ...postMutation,
  },
  AuthPayload,
}
