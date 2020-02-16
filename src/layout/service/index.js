import fetchApi, { apis } from '../../apis/index';

export const fetchLyric = function (params) {
    return fetchApi(apis.getLyric, params);
};