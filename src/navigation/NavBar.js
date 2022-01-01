import React from "react";
import "../stylesheets/NavBar.css";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import SearchForm from "./SearchForm";

function NavBar() {
  return (
    <nav className="NavBar navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="NavBar-link navbar-brand" to="/">
          States Map
        </Link>
        <SearchForm />
      </div>
    </nav>
  );
}

export default NavBar;
