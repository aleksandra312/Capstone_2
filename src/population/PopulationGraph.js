import React, { useEffect, useState, useRef } from "react";
import SvgGraph from "./SvgGraph";

function PopulationGraph({ data, header }) {
  return (
    <div className="PopulationGraph">
      <h2>{header}</h2>
      {data.length ? <SvgGraph data={data} /> : <p className="lead">No data</p>}
    </div>
  );
}

export default PopulationGraph;
