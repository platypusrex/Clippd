import * as bcrypt from 'bcryptjs';
import { Context, createToken, getUserId } from '../../util/authUtil';

export const auth = {
  async refreshToken(parent, args, ctx: Context, info) {
    const userId = getUserId(ctx);

    return {
      token: createToken(userId),
      userId,
    };
  },

  async signup(parent, args, ctx: Context, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser({
      data: {...args, password},
    });

    return {
      token: createToken(user.id),
      user,
    };
  },

  async login(parent, { email, password }, ctx: Context, info) {
    const user = await ctx.db.query.user({where: {email}});
    if (!user) {
      return {
        field: 'email',
        message: 'User not found'
      };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return {
        field: 'password',
        message: 'Invalid password'
      };
    }

    return {
      payload: {
        token: createToken(user.id),
        user
      }
    };
  },
};
