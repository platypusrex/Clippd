import { Context, getUserId } from '../../util/authUtil';
import { processUpload } from '../../util/imageUtil';

export const post = {
  async createPost(parent, {caption, picture}, ctx: Context, info) {
    const userId = getUserId(ctx);
    const pictureUrl = await processUpload(picture);

    return ctx.db.mutation.createPost(
      {
        data: {
          caption,
          pictureUrl,
          author: {
            connect: {id: userId},
          },
        },
      },
      info
    );
  },

  // async publish(parent, { id }, ctx: Context, info) {
  //   const userId = getUserId(ctx);
  //   const postExists = await ctx.db.exists.Post({
  //     id,
  //     author: { id: userId },
  //   });
  //   if (!postExists) {
  //     throw new Error(`Post not found or you're not the author`)
  //   }
  //
  //   return ctx.db.mutation.updatePost(
  //     {
  //       where: { id },
  //       data: { isPublished: true },
  //     },
  //     info,
  //   );
  // },

  async deletePost(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const postExists = await ctx.db.exists.Post({
      id,
      author: {id: userId},
    });

    if (!postExists) {
      throw new Error(`Post not found or you're not the author`);
    }

    return ctx.db.mutation.deletePost({
      where: {id}
    });
  },
};
