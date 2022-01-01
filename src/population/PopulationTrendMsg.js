import React, { useEffect, useState } from "react";
import "../stylesheets/PopulationTrendMsg.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faChartBar,
  faSortAmountDown,
} from "@fortawesome/free-solid-svg-icons";

function PopulationTrendMsg({ populationTrend }) {
  const INITIAL_STATE = { icon: faChartBar, color: "green" };
  const [chartIcon, setChartIcon] = useState(INITIAL_STATE);

  useEffect(() => {
    setIcon();
  }, [populationTrend]);

  const setIcon = () => {
    if (populationTrend === "increase") {
      setChartIcon({ icon: faChartLine, color: "green" });
    } else if (populationTrend === "decrease") {
      setChartIcon({ icon: faSortAmountDown, color: "red" });
    }
  };

  return (
    <div className="PopulationTrendMsg">
      {populationTrend.length ? (
        <p>
          According to our survey data, state population trend will{" "}
          {populationTrend}{" "}
          <FontAwesomeIcon
            icon={chartIcon.icon}
            size="lg"
            color={chartIcon.color}
          />
        </p>
      ) : (
        <p>Not enough responses to display population trend.</p>
      )}
    </div>
  );
}

export default PopulationTrendMsg;
