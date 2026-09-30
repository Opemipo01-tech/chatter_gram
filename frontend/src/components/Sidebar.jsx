import {
  NavLink,
  useNavigate,
  useOutletContext,
} from "react-router";

function Sidebar() {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>ChatterGram</h1>
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

        {/* <NavLink to="/edit-profile">
          Edit Profile
        </NavLink> */}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;