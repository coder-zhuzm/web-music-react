import React, { useEffect, memo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getTopData } from "../../store/actionCreators";

import { RankingWrapper } from "./style";
import ThemeHeaderRcm from "@/components/theme-header-rcm";
import TopRanking from "@/components/top-ranking";

const RankingList = memo(() => {
  const dispatch = useDispatch();
  const state = useSelector(
    (state) => ({
      topUpList: state.getIn(["recommend", "topUpList"]),
      topNewList: state.getIn(["recommend", "topNewList"]),
      topOriginList: state.getIn(["recommend", "topOriginList"]),
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(getTopData(19723756));
    dispatch(getTopData(3779629));
    dispatch(getTopData(2884035));
  }, [dispatch]);
  return (
    <RankingWrapper>
      <ThemeHeaderRcm title="榜单" moreLink="/discover/ranking" />
      <div className="tops">
        <TopRanking info={state.topUpList} />
        <TopRanking info={state.topNewList} />
        <TopRanking info={state.topOriginList} />
      </div>
    </RankingWrapper>
  );
});
export default RankingList;
