import React, { useEffect, useState } from "react";
import StatesTrendsApi from "../api/statesTrendsApi";
import "../stylesheets/StateRatingsList.css";
import useFields from "../hooks/useFields";
import { getYearsForRange } from "../helpers/helpers";
import SelectYearForm from "./SelectYearForm";
import LoadingSpinner from "../LoadingSpinner";
import { v4 as uuid } from "uuid";

const StatesRankingsList = () => {
  const [statesRatings, setStatesRatings] = useState([]);

  async function search(year) {
    const fromDate = `${year}-01-01`;
    const toDate = `${year}-12-31`;
    const orderBy = "relocate_true";
    const res = await StatesTrendsApi.getSurveyData(
      "",
      fromDate,
      toDate,
      "",
      orderBy
    );
    const popularStates = res.filter((state) => state.relocate_true !== "0");
    const firstTenStates = popularStates.slice(0, 10);
    setStatesRatings(firstTenStates);
  }

  if (!statesRatings) return <LoadingSpinner />;

  return (
    <div className="StatesRankings col-md-8 offset-md-2">
      <h2>Top popular states</h2>
      <SelectYearForm performSearch={search} />

      <ul className="list-group list-group-flush">
        {statesRatings.length ? (
          <div className="StatesRankings-list">
            {statesRatings.map((state) => (
              <li key={uuid()} className="list-group-item">
                {state.us_state}
              </li>
            ))}
          </div>
        ) : (
          <p className="lead">No data</p>
        )}
      </ul>
    </div>
  );
};

export default StatesRankingsList;
