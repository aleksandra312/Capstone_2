import React, { useEffect, useState, useRef } from "react";
import SvgGraph from "./SvgGraph";
import "../stylesheets/PopulationGraph.css";

function PopulationGraph({ data, header }) {
  return (
    <div className="PopulationGraph">
      <h3>{header}</h3>
      {data.length ? <SvgGraph data={data} /> : <p className="lead">No data</p>}
    </div>
  );
}

export default PopulationGraph;
