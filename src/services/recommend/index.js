import request from "../request";

export function getTopBanner() {
  return request({
    url: "/banner",
  });
}

export function getHotRecommend() {
  return request({
    url: "/personalized",
  });
}

export function getNewAlbum(limit, offset) {
  return request({
    url: "/top/album",
    params: {
      offset,
      limit,
    },
  });
}

export function getTopList(idx) {
  return request({
    url: "/top/list",
    params: {
      idx,
    },
  });
}

export function getArtistList(limit, cat) {
  return request({
    url: "/artist/list",
    params: {
      cat,
      limit,
    },
  });
}
