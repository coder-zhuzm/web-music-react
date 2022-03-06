import React, { memo } from "react";
import {
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight,
} from "./style";
import TopBanner from "./components/top-banner";
import HotRecommend from "./components/hotRecommend";
import NewAlbum from "./components/new-album";
import RankingList from "./components/ranking-list";
import UserLogin from "./components/user-login";
import HotRadio from "./components/hot-radio";
import SettleSinger from "./components/settle-singer";
const Recommend = memo(() => {
  return (
    <RecommendWrapper>
      <TopBanner />
      <Content className="wrap-v2">
        <RecommendLeft>
          <HotRecommend />
          <NewAlbum />
          <RankingList />
        </RecommendLeft>
        <RecommendRight>
          <UserLogin />
          <SettleSinger />
          <HotRadio />
        </RecommendRight>
      </Content>
    </RecommendWrapper>
  );
});

export default Recommend;
