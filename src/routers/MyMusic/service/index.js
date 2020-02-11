import fetchApi, { apis } from '../../../apis/index';

export const fetchMyPlayList = function (params) {
    return fetchApi(apis.getMyPlayList, params);
};

export const fetchPlayListDetail = function (params) {
    return fetchApi(apis.getPlayListDetail, params)
}

export const fetchSongUrl = function(params) {
    return fetchApi(apis.getSongUrl, params)
}