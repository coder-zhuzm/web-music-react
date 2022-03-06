import React, { memo } from "react";
import classnames from "classnames";
import { headerLinks } from "@/services/local-data";
import { NavLink } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { AppHeaderWrapper, HeaderLeft, HeaderRight } from "./style";

export default memo(function AppHeader() {
  const showItem = (item, index) => {
    if (index < 3) {
      return (
        <NavLink to={item.link}>
          {item.title}
          <i className="sprite_01 icon"></i>
        </NavLink>
      );
    } else {
      return (
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      );
    }
  };
  return (
    <AppHeaderWrapper>
      <div className="wrap-v1 content">
        <HeaderLeft>
          <a className="logo sprite_01" href="#/">
            网易云音乐
          </a>
          <div className="select-list">
            <ul>
              {headerLinks.map((item, index) => {
                return (
                  <li className={classnames("select-item")} key={item.title}>
                    {showItem(item, index)}
                  </li>
                );
              })}
            </ul>
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input
            placeholder="音乐/视频/电台/用户"
            className="search"
            prefix={<SearchOutlined />}
          />
          <div className="center">创作者中心</div>
          <div className="loginBtn">
            <a href="#/">登录</a>
          </div>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </AppHeaderWrapper>
  );
});
