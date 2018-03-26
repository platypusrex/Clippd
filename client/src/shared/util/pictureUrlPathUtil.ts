import { apiBasePath } from '../constants/apiConstants';

export function pictureUrlPath (url: string) {
  return apiBasePath + url.substring(1);
}