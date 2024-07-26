import React from "react";
import "../styles/LayoutStyles.css";

import { Link, useLocation } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Badge, message } from "antd";

function Layout({ children }) {
  const { user } = useSelector((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  //================doctor menu====================//

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },

    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
  ];

  //================doctor menu====================//

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Profile",
      path: `/admin/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },

    {
      name: "Users",
      path: "/admin/users",
      icon: "fa-solid fa-users",
    },
    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: "fa-solid fa-user-doctor",
    },
  ];
  //================admin menu=====================//

  //================user menu=====================//

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Profile",
      path: `/user/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },

    {
      name: "Appointments",
      path: "/appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "fa-solid fa-user-doctor",
    },
  ];
  //================user menu ======================//

  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  const getProfilePath = () => {
    if (user?.isAdmin) {
      return `/admin/profile/${user?._id}`;
    } else if (user?.isDoctor) {
      return `/doctor/profile/${user?._id}`;
    } else {
      return `/user/profile/${user?._id}`;
    }
  };
  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>DOC APP</h6>
            <hr /> {/* give a horizontal row */}
          </div>
          <div className="menu">
            {SidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <>
                  <div
                    key={menu.name}
                    className={`menu-item ${isActive && "active"}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>
                      <b>{menu.name}</b>
                    </Link>
                  </div>
                </>
              );
            })}
            <div className="menu-item" onClick={logoutHandler}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">
                <b>Logout</b>
              </Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content">
              <Link to="/notification">
                <Badge count={user && user.notification.length}>
                  <i className="fa-solid fa-bell"></i>
                </Badge>
              </Link>

              <Link to={getProfilePath()}>{user?.name}</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
