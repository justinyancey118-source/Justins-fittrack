import { NavLink } from "react-router";

function Header() {
  function getNavLinkClass({ isActive }) {
    return `nav-link ${
      isActive ? "active fw-bold text-success" : ""
    }`;
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink
            className="navbar-brand fw-bold"
            to="/"
          >
            <span className="badge text-bg-success me-2">
              F
            </span>

            FitTrack
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavigation"
            aria-controls="mainNavigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="mainNavigation"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={getNavLinkClass}
                >
                  Dashboard
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/workouts"
                  className={getNavLinkClass}
                >
                  Workouts
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/exercises"
                  className={getNavLinkClass}
                >
                  Exercises
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/goals"
                  className={getNavLinkClass}
                >
                  Goals
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/history"
                  className={getNavLinkClass}
                >
                  History
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;