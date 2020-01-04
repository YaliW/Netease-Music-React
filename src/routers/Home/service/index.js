import fetchApi, { apis } from '../../../apis/index';

export const fetchPlayList = function (params) {
  console.log(apis);
  return fetchApi(apis.getPlayList, params);
};