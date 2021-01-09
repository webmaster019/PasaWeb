
import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
// import Typography from "views/Typography.jsx";
// import Icons from "views/Icons.jsx";
// import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Login from "views/login"
// import Upgrade from "views/Upgrade.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Utilisateurs",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Plantations",
    icon: "pe-7s-leaf",
    component: TableList,
    layout: "/admin"
  },
  // {
  //   path: "/typography",
  //   name: "Plantations",
  //   icon: "pe-7s-news-paper",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "pe-7s-science",
  //   component: Icons,
  //   layout: "/admin"
  // },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  },

  

];

export default dashboardRoutes;
