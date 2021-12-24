import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StatesApi from "./api";
import { getWikiPageExtract } from "./helpers";

const State = () => {
  const { name } = useParams();

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
      </div>
    </div>
  );
};

export default State;
