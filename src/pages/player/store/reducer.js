import { Map } from "immutable";

import * as actionTypes from "./constants";

const defaultState = Map({
  playList: [],
  playSequence: 0, // 0 顺序播放 1 随机播放 2 单曲循环
  currentSongIndex: [],
  currentSong: {},
  currentLyrics: [],
  simiPlaylist: [],
  simiSongs: [],
  currentLyricIndex: -1,
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set("currentSong", action.song);
    case actionTypes.CHANGE_LYRICS:
      return state.set("currentLyrics", action.lyrics);
    case actionTypes.CHANGE_SIMI_PLAYLIST:
      return state.set("simiPlaylist", action.simiPlaylist);
    case actionTypes.CHANGE_SIMI_SONGS:
      return state.set("simiSongs", action.simiSongs);
    case actionTypes.CHANGE_PLAY_LIST:
      return state.set("playList", action.playList);
    case actionTypes.CHANGE_CURRENT_SONG_INDEX:
      return state.set("currentSongIndex", action.index);
    case actionTypes.CHANGE_CURRENT_LYRIC_INDEX:
      return state.set("currentLyricIndex", action.index);
    case actionTypes.CHANGE_PLAY_SEQUENCE:
      return state.set("playSequence", action.sequence);
    default:
      return state;
  }
}

export default reducer;
