import { NavLink } from "react-router-dom";
import { useAuth } from "../../util/authContext";

import "../HomePage/styles.css";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className="nav">
      <NavLink
        className="nav-link"
        exact
        to="/"
        activeClassName="nav-link-active"
      >
        Home
      </NavLink>
      {isLoggedIn || (
        <NavLink
          className="nav-link "
          to="/login"
          activeClassName="nav-link-active"
        >
          Login
        </NavLink>
      )}
      {isLoggedIn || (
        <NavLink
          className="nav-link"
          to="/signup"
          activeClassName="nav-link-active"
        >
          Signup
        </NavLink>
      )}
     
      {isLoggedIn && (
        <NavLink
          className="nav-link"
          to="/protected/history"
          activeClassName="nav-link-active"
        >
          History
        </NavLink>
      )}
      {isLoggedIn && <NavLink to="/Login" className="nav-link justify-content-end" onClick={logout}>Logout</NavLink>}
    </nav>
  );
}
export default Navbar;
