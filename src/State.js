import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StatesApi from "./api";
import { getWikiPageExtract } from "./helpers";
import PopulationGraph from "./PopulationGraph";

const State = () => {
  const { id, name } = useParams();

  const [stateInfo, setStateInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await StatesApi.getStateInfo(name);
      setStateInfo(getWikiPageExtract(res));
    })();
  }, [name]);

  return (
    <div className="State">
      <h1>{name}</h1>
      <div>
        <p>{stateInfo}</p>
        <PopulationGraph id={id} />
      </div>
    </div>
  );
};

export default State;
