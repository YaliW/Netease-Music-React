import { SET_MY_PLAY_LIST, SET_PLAY_LIST_DETAIL } from './actionTypes'
import { fetchMyPlayList, fetchPlayListDetail, fetchSongUrl } from '../service';
import { MyPlayList, PlayListDetail } from '../model';

// payload is the returned async res
export const setMyPlayList = (myPlayList = []) => ({
  type: SET_MY_PLAY_LIST,
  payload: myPlayList
});

export const setPlayListDetail = (playListDetail = {}) => ({
    type: SET_PLAY_LIST_DETAIL,
    payload: playListDetail
});

export const getPlayListDetail = (params) => {
  // getState 是当前能拿到的 state 值，一般为state 更新之前的值
  // dispatch 是触发 action
  // (dispatch, getState) 是 redux-thunk 的格式，redux-thunk 是redux 的中间件
  return (dispatch, getState) => {
    fetchPlayListDetail(params).then((res) => {
      if (res.status === 200 && res.data.code === 200) {
        const trackIds = res.data.playlist.trackIds
          .map(item => item.id)
          .join(',');
        const songUrlParam = { id: trackIds };
        const playListDetailRes = res.data.playlist;
        fetchSongUrl(songUrlParam).then(res1 => {
          if (res1.status === 200 && res1.data.code === 200) {
            const combineRes = Object.assign({}, playListDetailRes, {
              songUrlList: res1.data.data
            });
            dispatch(setPlayListDetail(PlayListDetail.fromJS(combineRes)))
          }
        });
      }
    }).catch(() => {

    });
  };
};

// action 是具体的业务逻辑， 包括同步和异步
export const getMyPlayList = (params) => {
  console.log(params);
  return function (dispatch, getState) {
    console.log('xxx');
    fetchMyPlayList(params).then((res) => {
      const { playlist } = res.data;
      if (res.status === 200 && res.data.code === 200) {
        dispatch(setMyPlayList(MyPlayList.fromJS(playlist)));
        dispatch(getPlayListDetail({ id: playlist.length > 0 ? playlist[0].id : null }))
      } else {
        dispatch(setMyPlayList([]));
      }
    }).catch(() => {
      dispatch(setMyPlayList([]))
    });
  };
};
