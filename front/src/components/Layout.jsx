import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";

const links = [
  { to: "/live", label: "Live monitor" },
  { to: "/alerts", label: "Alert history" },
  { to: "/trends", label: "Trends" },
  { to: "/profile", label: "Child profile" },
  { to: "/caregivers", label: "Caregivers" },
];

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-brand">CalmiSense</div>

        <nav className="sidebar-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="signout"
          onClick={() => {
            localStorage.removeItem("loggedIn");
            navigate("/login");
          }}
        >
          Sign out
        </button>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}