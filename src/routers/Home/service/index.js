import fetchApi, { apis } from '../../../apis/index';

export const fetchPlayList = function (params) {
  return fetchApi(apis.getPlayList, params);
};