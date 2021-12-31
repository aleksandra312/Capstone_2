import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const SvgGraph = ({ data }) => {
  const svgRef = useRef(null);
  const width = 400;
  const height = 400;
  const margin = { top: 20, right: 0, bottom: 30, left: 40 };

  useEffect(() => {
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove();

    let x = d3
      .scaleBand()
      .domain(data.map((d) => d.year))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    let y = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.value), d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5, "s"))
        .call((g) => g.select(".domain").remove());

    svgEl
      .append("g")
      .attr("class", "bars")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.year))
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value))
      .attr("width", x.bandwidth());

    svgEl.append("g").attr("class", "x-axis").call(xAxis);

    svgEl.append("g").attr("class", "y-axis").call(yAxis);
  }, [data]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default SvgGraph;
