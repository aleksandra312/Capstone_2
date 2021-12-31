import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExternalApi from "./api/externalApi";
import StatesTrendsApi from "./api/statesTrendsApi";
import { getWikiPageExtract, sumPropValues } from "./helpers";
import { getYearsForRange, getDatesForSurvey } from "./helpers";
import PopulationGraph from "./PopulationGraph";
import CommentsList from "./CommentsList";
import PopulationTrendMsg from "./PopulationTrendMsg";
import { YEARS_RANGE, CENSUS_POP_NUM_YRS_FROM_TODAY } from "./appConstants";

const State = ({ stateId, comments }) => {
  const { name } = useParams();

  const [stateInfo, setStateInfo] = useState(null);
  const [population, setPopulation] = useState([]);
  const [surveyData, setSurveyData] = useState([]);
  const [populationTrend, setPopulationTrend] = useState([]);

  const censusYears = getYearsForRange(
    YEARS_RANGE,
    CENSUS_POP_NUM_YRS_FROM_TODAY
  );

  useEffect(() => {
    setStateDescr();
    setStatePopulation();
    getStateSurveyData();
  }, [name]);

  async function setStateDescr() {
    const res = await ExternalApi.getStateInfo(name);
    setStateInfo(getWikiPageExtract(res));
  }

  async function setStatePopulation() {
    const newPopulation = [];
    for (let year of censusYears) {
      const res = await ExternalApi.getStatePopulation(stateId, year);
      let value = res[1][0];
      newPopulation.push({ value, year });
    }
    setPopulation(newPopulation);
  }

  async function getStateSurveyData() {
    const dates = getDatesForSurvey(YEARS_RANGE);

    let res = await StatesTrendsApi.getSurveyData(
      name,
      dates.fromDate,
      dates.toDate
    );
    const surveyData = extractDataFromSurveyRes(res);
    setSurveyData(surveyData);

    setPopTrendPrediction(res);
  }

  const extractDataFromSurveyRes = (res) => {
    return res.map((obj) => ({ value: obj.relocate_true, year: obj.year }));
  };

  const setPopTrendPrediction = (res) => {
    if (res.length) {
      const currentYear = new Date().getFullYear();
      const lastTwoYrs = res.filter(
        (obj) => obj.year === currentYear || obj.year === currentYear - 1
      );
      if (lastTwoYrs) {
        const relocateTrue = sumPropValues(lastTwoYrs, "relocate_true");
        const relocateFalse = sumPropValues(lastTwoYrs, "relocate_false");

        if (relocateTrue > relocateFalse) {
          setPopulationTrend("increase");
        } else if (relocateTrue === relocateFalse) {
          setPopulationTrend("stay the same");
        } else {
          setPopulationTrend("descrease");
        }
      }
    }
  };

  return (
    <div className="State">
      <h1>{name}</h1>
      <div>
        <p>{stateInfo}</p>
        <h2>State Population</h2>
        <PopulationGraph data={population} />
        <h2>State Popularity</h2>
        <PopulationGraph data={surveyData} />
        <PopulationTrendMsg populationTrend={populationTrend} />
        <CommentsList usState={name} comments={comments} />
      </div>
    </div>
  );
};

export default State;
