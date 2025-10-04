import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { MODULES } from "../../constant/navigation";
import "./Sidebar.css";

function useActiveRoute() {
  const { pathname } = useLocation();
  const isActive = (route) =>
    pathname === route || pathname.startsWith(route + "/");
  return { isActive };
}

const Sidebar = ({ collapsed, onHoverStart, onHoverEnd }) => {
  const { isActive } = useActiveRoute();

  const items = useMemo(
    () =>
      MODULES.map((m) => {
        const Icon = m.icon;
        return { ...m, Icon };
      }),
    []
  );

  return (
    <aside
      className={`Sidebar ${collapsed ? "is-collapsed" : ""}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div className="Sidebar-box">
        <ul className="Sidebar-list">
          {items.map(({ key, name, route, Icon, iconName }) => (
            <li
              key={key}
              className={`Sidebar-item ${isActive(route) ? "active" : ""}`}
            >
              <Link to={route} className="Sidebar-link" title={name}>
                <Icon className="Sidebar-icon" aria-hidden="true" />
                <div className="Sidebar-text">
                  <span className="Sidebar-name">{name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
