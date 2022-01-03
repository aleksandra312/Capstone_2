import React, { useEffect, useState } from "react";
import StatesTrendsApi from "../api/statesTrendsApi";
import "../stylesheets/StateRatingsList.css";
import useFields from "../hooks/useFields";
import { getYearsForRange } from "../helpers/helpers";
import { v4 as uuid } from "uuid";

const SelectYearForm = ({ performSearch }) => {
  const INITIAL_STATE = {
    year: new Date().getFullYear(),
  };

  const [formData, handleChange, resetForm] = useFields(INITIAL_STATE);

  const selectYearsOpts = getYearsForRange(5, 0);

  useEffect(() => {
    performSearch(formData.year);
  }, [formData.year]);

  return (
    <div className="StatesRankings">
      <form className="StatesRankingsForm">
        <div class="form-group">
          <select
            className="form-control form-select"
            type="text"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
          >
            {selectYearsOpts.map((y) => (
              <option value={y}>{y}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default SelectYearForm;
