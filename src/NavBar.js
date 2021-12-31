import React from "react";
import "./stylesheets/NavBar.css";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar() {
  return (
    <nav className="NavBar navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        States Map
      </Link>
    </nav>
  );
}

export default NavBar;
