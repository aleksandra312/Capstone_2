import React from "react";

function PopulationTrendMsg({ populationTrend }) {
  return (
    <div className="PopulationTrendMsg">
      {populationTrend.length ? (
        <p>
          According to survey data, state population trend will{" "}
          {populationTrend}
        </p>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default PopulationTrendMsg;
