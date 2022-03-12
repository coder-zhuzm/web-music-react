import React, { memo, useRef, useEffect, useState, useCallback } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { message, Slider, notification } from "antd";
import { getPlayUrl, formatMinuteSecond } from "@/utils/format-utils";

import {
  // getSongDetailAction,
  changeCurrentLyricIndexAction,
  changePlaySequenceAction,
  changePlaySongAction,
} from "../store/actionCreators";
import HYAppPlayPanel from "../app-play-panel";

import { PlaybarWrapper, Control, PlayInfo, Operator } from "./style";

export default memo(function AppPlaybar() {
  const audioRef = useRef();
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const {
    currentSong,
    currentLyrics,
    currentLyricIndex,
    playList,
    playSequence,
  } = useSelector(
    (state) => ({
      currentSong: state.getIn(["player", "currentSong"]),
      currentLyrics: state.getIn(["player", "currentLyrics"]),
      currentLyricIndex: state.getIn(["player", "currentLyricIndex"]),
      playList: state.getIn(["player", "playList"]),
      playSequence: state.getIn(["player", "playSequence"]),
      // playSequence: 0, // 0 顺序播放 1 随机播放 2 单曲循环
    }),
    shallowEqual
  );

  // 获取歌曲详情
  // useEffect(() => {
  //   dispatch(getSongDetailAction(167876));
  // }, [dispatch]);

  // 歌曲详情获取到的操作
  useEffect(() => {
    audioRef.current.src = getPlayUrl(currentSong.id); // ref 方式 给audio 设置src
    audioRef.current // 设置 audio 播放
      .play()
      .then((res) => {
        setIsPlaying(true); //访问 playing 方法 进行下一步操作
      })
      .catch((err) => {
        setIsPlaying(false);
      });
    setDuration(currentSong.dt);
  }, [currentSong]);
  //播放相关
  const play = useCallback(() => {
    setIsPlaying(!isPlaying); // 设置播放 / 暂停
    isPlaying
      ? audioRef.current.pause() //反向原因 ↑
      : audioRef.current.play().catch((err) => {
          setIsPlaying(false);
        });
  }, [isPlaying]); // 播放状态发生改变的相关操作
  // 进度条change
  const sliderChange = useCallback(
    (value) => {
      setProgress(value);
      const time = ((value / 100.0) * duration) / 1000;
      setCurrentTime(time);
      setIsChanging(true);
    },
    [duration]
  );
  //进度条change → mouseup
  const sliderAfterChange = useCallback(
    (value) => {
      const time = ((value / 100.0) * duration) / 1000;
      audioRef.current.currentTime = time;
      setCurrentTime(time);
      setIsChanging(false);

      if (!isPlaying) {
        play();
      }
    },
    [duration, isPlaying, play]
  );
  // audio time change
  const timeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    if (!isChanging) {
      setCurrentTime(currentTime);
      setProgress(((currentTime * 1000) / duration) * 100);
    }
    // 歌词展示部分
    let lrcLength = currentLyrics.length;
    let i = 0;
    for (; i < lrcLength; i++) {
      const lrcTime = currentLyrics[i].time;
      if (currentTime * 1000 < lrcTime) {
        break;
      }
    }
    const finalIndex = i - 1;
    if (finalIndex !== currentLyricIndex) {
      dispatch(changeCurrentLyricIndexAction(finalIndex));
      if (currentLyrics[finalIndex]?.content) {
        message.open({
          content: currentLyrics[finalIndex].content,
          key: "lyric",
          duration: 0,
          className: "lyric-message",
        });
      }
    }
  };
  // 播放结束
  const timeEnded = () => {
    if (playSequence === 2 || playList.length === 1) {
      //单曲播放
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(changePlaySongAction(1));
    }
  };

  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button
            className="sprite_playbar btn prev"
            onClick={(e) => {
              if (playList.length) {
                dispatch(changePlaySongAction(-1));
                return;
              }
              notification.open({
                message: "播放列表为空",
                description: "播放列表为空",
                duration: 2,
              });
            }}
          ></button>
          <button
            className="sprite_playbar btn play"
            onClick={(e) => {
              if (playList.length) {
                play();
                return;
              }
              notification.open({
                message: "播放列表为空",
                description: "播放列表为空",
                duration: 2,
              });
            }}
          ></button>
          <button
            className="sprite_playbar btn next"
            onClick={(e) => {
              if (playList.length) {
                dispatch(changePlaySongAction(1));
                return;
              }
              notification.open({
                message: "播放列表为空",
                description: "播放列表为空",
                duration: 2,
              });
            }}
          ></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to={playList.length ? "/discover/player" : ""}>
              <img src={currentSong?.al?.picUrl} alt="" title="歌曲封面图" />
            </NavLink>
          </div>

          <div className="info">
            <div className="song">
              <a className="song-name" href="/">
                {currentSong?.name || ""}
              </a>
              <a className="singer-name" href="/">
                {(currentSong?.ar && currentSong?.ar[0]?.name) || ""}
              </a>
            </div>
            <div className="progress">
              <Slider
                value={progress}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}
              />
              <div className="time">
                <span className="now-time">
                  {formatMinuteSecond(currentTime * 1000)}
                </span>
                <span className="divider">/</span>
                <span className="total-time">
                  {duration ? formatMinuteSecond(duration) : "00:00"}
                </span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={playSequence}>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button
              className="sprite_playbar btn loop"
              onClick={(e) => {
                dispatch(changePlaySequenceAction(playSequence + 1));
              }}
            ></button>
            <button
              className="sprite_playbar btn playlist"
              onClick={(e) => setShowPanel(!showPanel)}
            >
              {playList.length}
            </button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={timeEnded} />
      {showPanel && <HYAppPlayPanel />}
    </PlaybarWrapper>
  );
});
