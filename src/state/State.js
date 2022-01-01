import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ExternalApi from "../api/externalApi";
import StatesTrendsApi from "../api/statesTrendsApi";
import { getWikiPageExtract, sumPropValues } from "../helpers/helpers";
import { getYearsForRange, getDatesForSurvey } from "../helpers/helpers";
import PopulationGraph from "../population/PopulationGraph";
import CommentsList from "../survey/CommentsList";
import StateInfo from "./StateInfo";
import LoadingSpinner from "../LoadingSpinner";
import PopulationTrendMsg from "../population/PopulationTrendMsg";
import { YEARS_RANGE, CENSUS_POP_NUM_YRS_FROM_TODAY } from "../appConstants";
import StatesContext from "../StatesContext";

const State = ({ comments }) => {
  const { name } = useParams();

  const { stateInfo } = useContext(StatesContext);

  const [stateDescr, setStateDescr] = useState([]);
  const [population, setPopulation] = useState([]);
  const [surveyData, setSurveyData] = useState([]);
  const [populationTrend, setPopulationTrend] = useState([]);

  const censusYears = getYearsForRange(
    YEARS_RANGE,
    CENSUS_POP_NUM_YRS_FROM_TODAY
  );

  useEffect(() => {
    setStateWikiDescr();
    setStatePopulation();
    setStateSurveyData();
  }, [name]);

  async function setStateWikiDescr() {
    const res = await ExternalApi.getStateInfo(name);
    setStateDescr(getWikiPageExtract(res));
  }

  async function setStatePopulation() {
    const newPopulation = [];
    for (let year of censusYears) {
      const res = await ExternalApi.getStatePopulation(stateInfo.stateId, year);
      let value = res[1][0];
      newPopulation.push({ value, year });
    }
    setPopulation(newPopulation);
  }

  async function setStateSurveyData() {
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
    if (res.length >= 2) {
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
    <div className="State col-md-8 offset-md-2">
      <div>
        <StateInfo name={name} stateDescr={stateDescr} />
        {population.length ? (
          <PopulationGraph data={population} header="State Population" />
        ) : (
          <LoadingSpinner />
        )}
        {surveyData.length >= 2 ? (
          <PopulationGraph data={surveyData} header="State Popularity" />
        ) : (
          <p></p>
        )}
        <PopulationTrendMsg populationTrend={populationTrend} />
        <CommentsList usState={name} comments={comments} />
      </div>
    </div>
  );
};

export default State;
