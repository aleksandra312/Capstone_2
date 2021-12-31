import React, { useEffect, useState, useRef } from "react";
import SvgGraph from "./SvgGraph";

function PopulationGraph({ data }) {
  return (
    <div>
      <SvgGraph data={data} />
    </div>
  );
}

export default PopulationGraph;
