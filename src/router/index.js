import Recommend from "../pages/discover/c-pages/recommend";
import { Redirect } from "react-router-dom";

import Discover from "../pages/discover";

const routers = [
  {
    path: "/",
    exact: true,
    render: () => {
      <Redirect to="/discover" />;
    },
  },
  {
    path: "/discover",
    component: Discover,
    routers: [
      {
        path: "/discover",
        exact: true,
        render: () => <Redirect to={"/discover/recommend"} />,
      },
      {
        path: "/discover/recommend",
        component: Recommend,
      },
    ],
  },
];
export default routers;
