import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    setSearchTerm(searchTerm.trim());
    navigate(`/state/${searchTerm}`);
    setSearchTerm("");
  }

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <form className="SearchForm d-flex" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        name="searchTerm"
        placeholder="Enter state.."
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="SearchForm-btn btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
