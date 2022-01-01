import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import "../stylesheets/StatesMap.css";

function StatesMap({ statesData, setStateInfo }) {
  const navigate = useNavigate();
  const svgRef = useRef(null);
  const path = d3.geoPath();

  const width = 975;
  const height = 610;

  useEffect(() => {
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove();

    const g = svgEl.append("g");

    const states = g
      .append("g")
      .attr("fill", "steelblue")
      .attr("cursor", "pointer")
      .selectAll("path")
      .data(topojson.feature(statesData, statesData.objects.states).features)
      .join("path")
      .on("mouseover", function (d) {
        d3.select(this).style("fill", "lightsteelblue");
      })
      .on("mouseout", function (d) {
        d3.select(this).style("fill", "steelblue");
      })
      .on("click", handleClick)
      .attr("d", path);

    states.append("title").text((d) => d.properties.name);

    g.append("path")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr(
        "d",
        path(
          topojson.mesh(
            statesData,
            statesData.objects.states,
            (a, b) => a !== b
          )
        )
      );
  }, []);

  function handleClick(event, d) {
    setStateInfo({ stateId: d.id, stateName: d.properties.name });
    navigate(`/state/${d.properties.name}`);
  }

  return (
    <div className="StatesMap col-md-8 offset-md-1">
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
}

export default StatesMap;
