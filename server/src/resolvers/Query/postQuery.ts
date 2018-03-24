import { forwardTo } from 'prisma-binding';
import { Context } from '../../util/authUtil';

export const postQuery = {
  posts: forwardTo('db'),
  post(parent, { id }, ctx: Context, info) {
    return ctx.db.query.post({ where: { id: id } }, info);
  },
};