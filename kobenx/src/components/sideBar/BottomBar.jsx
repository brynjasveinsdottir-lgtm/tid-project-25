import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Parse from "parse";
import "./SideBarStyle.css";

import { getUserPublic } from "../services/userService.js";

import ProfileInfo from "../profileInfo/ProfileInfo.jsx";
import Button from "../button/Button";
import { SideBarData } from "./SideBarData";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function BottomBar() {
  async function logOutUser() {
    Parse.User.logOut().then(() => {
      const currentUser = Parse.User.current();
    });
    window.location.reload();
  }

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const userPublic = await getUserPublic();
      setUser(userPublic);
    }
    getUser();
  }, []);

  return (
    <aside className="bottom-bar">
      <div className="sidebar-logo">
        <NavLink to="/">
          <h1 className="logo">
            <span className="logo-full"> købenx </span>
            <span className="logo-collapsed"> ø </span>
          </h1>
        </NavLink>
      </div>

      <ul className="sidebar-title-list">
        {SideBarData.map((item, id) => {
          const IconComponent = item.icon;

          return (
            <li key={id} className="sidebar-links">
              <NavLink to={item.path}>
                <IconComponent className="sidebar-icons" />
                <span className="sidebar-item-text"> {item.title} </span>
              </NavLink>
            </li>
          );
        })}
      </ul>

      <div className="sidebar-profile">
        <NavLink to="/profile">
          <ProfileInfo userInfo={user} />
        </NavLink>
      </div>

      <div className="logout-button">
        <Button variant="secondary" className="small-button" onClick={logOutUser}>
          {" "}
          <LogoutOutlinedIcon fontSize="20"/>
          <span className="longtext"> Log Out </span>
        </Button>
      </div>
    </aside>
  );
}
