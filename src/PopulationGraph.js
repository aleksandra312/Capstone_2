import React, { useEffect, useState, useRef } from "react";
import StatesApi from "./api";
import { getYearsRange } from "./helpers";
import { YEARS_RANGE } from "./appConstants";
import SvgGraph from "./SvgGraph";

function PopulationGraph({ id }) {
  const [population, setPopulation] = useState([]);
  const years = getYearsRange(YEARS_RANGE);

  useEffect(() => {
    (async () => {
      for (let year of years) {
        const res = await StatesApi.getStatePopulation(id, year);
        let value = res[1][0];
        setPopulation((prevPopulation) => [...prevPopulation, { value, year }]);
      }
    })();
  }, [id]);

  return (
    <div>
      <h2>Population Trend</h2>
      <SvgGraph data={population} />
    </div>
  );
}

export default PopulationGraph;
