import { createWriteStream } from "fs";
import * as shortid from 'shortid'

const storeUpload = async ({ stream, filename }): Promise<any> => {
  const id = shortid.generate();
  const path = `./images/${id}-${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({path}))
      .on('error', reject),
  );
};

export const processUpload = async (upload) => {
  const { stream, filename, mimetype, encoding } = await upload;
  const { path } = await storeUpload({stream, filename});
  return path;
};