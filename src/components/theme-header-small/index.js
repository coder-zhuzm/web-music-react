import React, { memo } from "react";

import { HeaderSmallWrapper } from "./style";

export default memo(function ThemeHeaderSmall(props) {
  const { title, more } = props;

  return (
    <HeaderSmallWrapper>
      <h3>{title}</h3>
      <a href="/">{more}</a>
    </HeaderSmallWrapper>
  );
});
