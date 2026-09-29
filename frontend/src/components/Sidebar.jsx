import { NavLink, useOutletContext } from "react-router";

function Sidebar() {
  const { user } = useOutletContext();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>OdinBook</h1>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/">
          Home
        </NavLink>

        <NavLink to="/users">
          People
        </NavLink>

        <NavLink to="/follow-requests">
          Follow Requests
        </NavLink>

        <NavLink to={`/users/${user.id}`}>
          My Profile
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;