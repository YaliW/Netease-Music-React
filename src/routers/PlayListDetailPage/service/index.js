import fetchApi, { apis } from '../../../apis/index';

export const fetchPlayListDetail = function (params) {
    return fetchApi(apis.getPlayListDetail, params)
}

export const fetchSongUrl = function(params) {
    return fetchApi(apis.getSongUrl, params)
}