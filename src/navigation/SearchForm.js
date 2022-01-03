import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import StatesContext from "../StatesContext";
import { toTitleCase } from "../helpers/helpers";

function SearchForm() {
  const navigate = useNavigate();

  const { statesData } = useContext(StatesContext);
  const { stateInfo, setStateInfo } = useContext(StatesContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchErr, setSearchErr] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    const foundState = findState();

    if (!foundState.length) {
      setSearchErr("State not found");
    } else {
      setSearchErr("");
      setStateInfo({
        stateId: foundState[0].id,
        stateName: foundState[0].properties.name,
      });
      navigate(`/state/${searchTerm}`);
      setSearchTerm("");
    }
  }

  const findState = () => {
    const states = statesData.objects.states.geometries;
    return states.filter((state) => searchTerm === state.properties.name);
  };

  function handleChange(evt) {
    const search = toTitleCase(evt.target.value);
    setSearchTerm(search);
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
      <div className="col-sm-2">
        <small id="searchErr" className="text-danger">
          {searchErr}
        </small>
      </div>
    </form>
  );
}

export default SearchForm;
