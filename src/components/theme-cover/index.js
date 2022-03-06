import React, { memo } from "react";

import { getSizeImage, getCount } from "@/utils/format-utils";
import { ThemeCoverWrapper } from "./style";
const ThemeCover = memo((props) => {
  const { info, right } = props;

  return (
    <ThemeCoverWrapper right={right}>
      <div className="cover-top">
        <img
          src={getSizeImage(info.picUrl || info.coverImgUrl, 140)}
          alt={info.name}
        />
        <div className="cover sprite_cover">
          <div className="info sprite_covor">
            <div className="left">
              <i className="sprite_icon erji"></i>
              {getCount(info.playCount)}
            </div>

            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>

      <div className="cover-bottom text-nowrap">{info.name}</div>
      <div className="cover-source">
        by {info.copywriter || info.creator.nickname}
      </div>
    </ThemeCoverWrapper>
  );
});

export default ThemeCover;
