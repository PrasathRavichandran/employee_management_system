import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Employee Management
        </Link>
        <div className="navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link">
                Home
              </NavLink>
            </li>
          </ul>
          <Link
            to="/add/employee"
            className="btn btn-outline-primary my-2 mx-3"
          >
            Add Employee
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
