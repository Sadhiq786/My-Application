import React, { useMemo, useState, useRef, useEffect   } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { MODULES, SUBMODULES } from "../../constant/navigation";
import "./HeaderNavigation.css";
import Sidebar from "../Sidebar/Sidebar";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import ProfilePic from "../../assets/Images/ProfilePicture.jpg";

function resolveActive(pathname) {
  const module =
    MODULES.find(
      (m) => pathname === m.route || pathname.startsWith(m.route + "/")
    ) || MODULES.find((m) => pathname === m.route);

  let sub = null;
  if (module && SUBMODULES[module.key]) {
    sub =
      SUBMODULES[module.key].find(
        (s) => pathname === s.route || pathname.startsWith(s.route + "/")
      ) || null;
  }
  return { module, sub };
}

const DARK_GRADIENTS = [
  { n: "Starry Night", s: ["#003366", "#0F52BA"], a: 159 },
  { n: "Night Shift", s: ["#1B1B1B", "#003153"], a: 315 },
  { n: "Purp Vader", s: ["#310E68", "#5F0F40"], a: 316 },
  { n: "Odin", s: ["#002147", "#3B3C36"], a: 315 },
  { n: "Television Star", s: ["#4B4E53", "#000000"], a: 147 },
  { n: "Amazon Dust", s: ["#0C0C0C", "#CA7968"], a: 315 },
  { n: "Famous Name", s: ["#43302E", "#AD6F69"], a: 315 },
  { n: "Expensive Hat", s: ["#874000", "#321d93ff"], a: 315 },
  { n: "Worker's Day", s: ["#1B2845", "#000F89"], a: 315 },
  { n: "Red Potato", s: ["#006130ff", "#6e21c6ff"], a: 147 },
  { n: "Visible Village", s: ["#003153", "#0ABAB5"], a: 315 },
  { n: "Solar Eclipse", s: ["#971c99ff", "#00856cff"], a: 147 },
];

const gradientCss = (g) =>
  `linear-gradient(${g.a}deg, ${g.s[0]} 0%, ${g.s[1]} 100%)`;

const hash = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
};

const HOVER_LINGER_MS = 500;
let SidebarCollapse = true;

const HeaderNavigation = ({ children }) => {
  const { pathname } = useLocation();
   const navigate = useNavigate (); 
  const { module: activeModule, sub: activeSub } = useMemo(
    () => resolveActive(pathname),
    [pathname]
  );

  const [collapsed, setCollapsed] = useState(SidebarCollapse);
  useEffect(() => {
    SidebarCollapse = collapsed;
  }, [collapsed]);

  const seedRef = useRef(Math.floor(Math.random() * 1000));

  const [sidebarHover, setSidebarHover] = useState(false);
  const [appHover, setAppHover] = useState(false);
  const sidebarTimerRef = useRef(null);
  const appTimerRef = useRef(null);

  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(-1);
  const inputRef = useRef(null);
  const boxRef = useRef(null);

  const SEARCH_ITEMS = useMemo(() => {
    const items = [];

    MODULES.forEach((m) => {
      items.push({
        type: "module",
        key: m.key,
        name: m.name,
        route: m.route,
        Icon: m.icon,
        moduleKey: m.key,
      });

      (SUBMODULES[m.key] || []).forEach((s) => {
        items.push({
          type: "submodule",
          key: `${m.key}:${s.key || s.route}`,
          name: s.name,
          route: s.route,
          Icon: s.icon,
          moduleKey: m.key,
        });
      });
    });
    return items;
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return [];
    const term = q.trim().toLowerCase();
    return SEARCH_ITEMS.filter((it) =>
      it.name.toLowerCase().includes(term)
    ).slice(0, 10);
  }, [q, SEARCH_ITEMS]);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Focus shortcut: press "/" to focus search
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reset search when switching to a different module
  useEffect(() => {
    // figure current module root from pathname: "/module"
    const currentRoot = "/" + (pathname.split("/").filter(Boolean)[0] || "");
    // if activeModule exists and route differs from current root, still clear safely
    setQ("");
    setHi(-1);
    setOpen(false);
  }, [activeModule?.key, pathname]);

  const goTo = (route) => {
    setOpen(false);
    setQ("");
    setHi(-1);
    navigate(route);
  };

  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (!filtered.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHi((v) => (v + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((v) => (v - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = filtered[hi >= 0 ? hi : 0];
      if (pick) goTo(pick.route);
    } else if (e.key === "Escape") {
      setOpen(false);
      setHi(-1);
    }
  };

  useEffect(() => {
    return () => {
      if (sidebarTimerRef.current) clearTimeout(sidebarTimerRef.current);
      if (appTimerRef.current) clearTimeout(appTimerRef.current);
    };
  }, []);

  const handleSidebarHoverStart = () => {
    if (sidebarTimerRef.current) clearTimeout(sidebarTimerRef.current);
    setSidebarHover(true);
  };
  const handleSidebarHoverEnd = () => {
    if (sidebarTimerRef.current) clearTimeout(sidebarTimerRef.current);
    sidebarTimerRef.current = setTimeout(
      () => setSidebarHover(false),
      HOVER_LINGER_MS
    );
  };

  const handleAppShellEnter = () => {
    if (appTimerRef.current) clearTimeout(appTimerRef.current);
    setAppHover(true);
  };
  const handleAppShellLeave = () => {
    if (appTimerRef.current) clearTimeout(appTimerRef.current);
    appTimerRef.current = setTimeout(() => setAppHover(false), HOVER_LINGER_MS);
  };

  const showToggle = sidebarHover || appHover;
  const ToggleIcon = collapsed
    ? TbLayoutSidebarRightCollapseFilled
    : TbLayoutSidebarLeftCollapseFilled;

  if (!activeModule) return null;

  const submodules = SUBMODULES[activeModule.key] || [];

  return (
    <div className="AppShell">
      <header
        className="Header-nav"
        role="banner"
        onMouseEnter={handleAppShellEnter}
        onMouseLeave={handleAppShellLeave}
      >
        <div className="Header-top">
          <div className="Header-appName">
            <span>My Application</span>

            <button
              type="button"
              className={`Header-toggle ${
                showToggle ? "is-visible" : "is-hidden"
              }`}
              onClick={() => setCollapsed((v) => !v)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
              aria-hidden={!showToggle}
              tabIndex={showToggle ? 0 : -1}
              title={collapsed ? "Expand" : "Collapse"}
            >
              <ToggleIcon className="Header-toggleIcon" />
            </button>

            <div className="Search" ref={boxRef}>
              <input
                ref={inputRef}
                type="search"
                className="SearchInput"
                placeholder="Search modules or pages…  ( / to focus )"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setOpen(true);
                  setHi(-1);
                }}
                onFocus={() => q && setOpen(true)}
                onKeyDown={onKeyDown}
                aria-autocomplete="list"
                aria-expanded={open}
                aria-haspopup="listbox"
                role="combobox"
              />
              {open && filtered.length > 0 && (
                <ul className="SearchResults" role="listbox">
                  {filtered.map((it, idx) => {
                    const ActiveIcon = it.Icon;
                    return (
                      <li
                        key={it.key}
                        className={`SearchItem ${
                          idx === hi ? "is-active" : ""
                        }`}
                        role="option"
                        aria-selected={idx === hi}
                        onMouseEnter={() => setHi(idx)}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => goTo(it.route)}
                        title={it.name}
                      >
                        {ActiveIcon ? (
                          <ActiveIcon className="SearchItem-icon" />
                        ) : (
                          <span className="SearchItem-dot" />
                        )}
                        <span className="SearchItem-name">{it.name}</span>
                        <span
                          className={`SearchItem-badge ${
                            it.type === "module" ? "is-module" : "is-sub"
                          }`}
                        >
                          {it.type === "module" ? "Module" : "Sub-module"}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="Header-left">
            <div className="Header-titles">
              {activeSub && (
                <div className="Header-crumb">
                  <span className="sep">/</span>
                  <Link to={activeSub.route} className="Header-sub">
                    {activeSub.name}
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="Header-right">
            <span className="Header-moduleName">{activeModule.name}</span>
            <img src={ProfilePic} alt="Profile" className="Header-avatar" />
          </div>
          <div />
        </div>

        {submodules.length > 0 && (
          <nav className="Header-box" aria-label="Submodule navigation">
            {submodules.map((s, idx) => {
              const keyish = s.key || s.name || s.route || String(idx);
              const g =
                DARK_GRADIENTS[
                  (hash(keyish) + seedRef.current) % DARK_GRADIENTS.length
                ];
              const isActive =
                pathname === s.route || pathname.startsWith(s.route + "/");
              return (
                <Link
                  key={s.key || s.route}
                  to={s.route}
                  className={`Header-tab ${isActive ? "is-active" : ""}`}
                  style={{
                    backgroundImage: gradientCss(g),
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  title={g.n}
                >
                  {s.icon ? <s.icon className="tab-icon" /> : null}
                  <span>{s.name}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      <div className="AppBody">
        <Sidebar
          collapsed={collapsed}
          onHoverStart={handleSidebarHoverStart}
          onHoverEnd={handleSidebarHoverEnd}
        />
        <div className="AppContent">{children}</div>
      </div>
    </div>
  );
};

export default HeaderNavigation;
