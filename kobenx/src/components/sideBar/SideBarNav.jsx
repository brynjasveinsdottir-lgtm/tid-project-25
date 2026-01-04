import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Parse from "parse";
import "./SideBarStyle.css";

import { getUserPublic } from "../services/userService.js";

import ProfileInfo from "../profileInfo/ProfileInfo";
import Button from "../button/Button";
import { SideBarData } from "./SideBarData";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function SideBarNav() {
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
    <aside className="sidebar">
      <div className="sidebar-logo">
        <NavLink to="/">
          <h1 className="logo"> købenx </h1>
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

      <div>
        <Button variant="secondary" onClick={logOutUser}>
          {" "}
          <LogoutOutlinedIcon fontSize="20" />
          Log out
        </Button>
      </div>
    </aside>
  );
}
