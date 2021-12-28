import React, { useEffect, useState, useRef } from "react";
import ExternalApi from "./api/externalApi";
import { getYearsRange } from "./helpers";
import { YEARS_RANGE } from "./appConstants";
import SvgGraph from "./SvgGraph";

function PopulationGraph({ id }) {
  const [population, setPopulation] = useState([]);
  const years = getYearsRange(YEARS_RANGE);

  useEffect(() => {
    setStatePopulation();
  }, [id]);

  async function setStatePopulation() {
    const newPopulation = [];
    for (let year of years) {
      const res = await ExternalApi.getStatePopulation(id, year);
      let value = res[1][0];
      newPopulation.push({ value, year });
    }
    setPopulation(newPopulation);
  }

  return (
    <div>
      <h2>Population Trend</h2>
      <SvgGraph data={population} />
    </div>
  );
}

export default PopulationGraph;
