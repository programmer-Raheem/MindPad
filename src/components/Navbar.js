import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current route:", location.pathname);
  }, [location]);

  // 🟢 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ clear auth token
    navigate("/login"); // ✅ redirect to login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>

        {/* ✅ Bootstrap toggle fix */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* 🧭 Nav Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>

          {/* 🟣 Right-side buttons */}
          {!localStorage.getItem("token") ? (
            // 🧱 If NOT logged in → show Login/Signup
            <form className="d-flex gap-2" role="buttons">
              <Link className="btn btn-primary" to="/login">
                Login
              </Link>
              <Link className="btn btn-success" to="/signup">
                Signup
              </Link>
            </form>
          ) : (
            // 🧱 If logged in → show Logout
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
