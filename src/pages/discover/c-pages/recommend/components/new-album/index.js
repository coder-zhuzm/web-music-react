import React, { memo, useEffect, useRef } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { getAlbum } from "../../store/actionCreators";

import { Carousel } from "antd";
import ThemeHeaderRcm from "@/components/theme-header-rcm";
import AlbumCover from "@/components/album-cover";

import { AlbumWrapper } from "./style";
const NewAlbum = memo(() => {
  const carouselRef = useRef();
  const dispatch = useDispatch();
  const state = useSelector(
    (state) => ({
      newAlbum: state.getIn(["recommend", "newAlbum"]),
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(getAlbum());
  }, [dispatch]);
  return (
    <AlbumWrapper>
      <ThemeHeaderRcm title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <div
          className="arrow arrow-left sprite_02"
          onClick={(e) => carouselRef.current.prev()}
        ></div>
        <div className="album">
          <Carousel ref={carouselRef} dots={false}>
            {[0, 1].map((item) => {
              return (
                <div key={item} className="page">
                  {state.newAlbum
                    .slice(item * 5, (item + 1) * 5)
                    .map((item) => {
                      return <AlbumCover key={item.id} info={item} />;
                    })}
                </div>
              );
            })}
          </Carousel>
        </div>
        <div
          className="arrow arrow-right sprite_02"
          onClick={(e) => carouselRef.current.next()}
        ></div>
      </div>
    </AlbumWrapper>
  );
});

export default NewAlbum;
