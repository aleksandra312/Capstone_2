import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExternalApi from "./api/externalApi";
import { getWikiPageExtract } from "./helpers";
import PopulationGraph from "./PopulationGraph";
import CommentsList from "./CommentsList";

const State = ({ stateId, comments }) => {
  const { name } = useParams();

  const [stateInfo, setStateInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await ExternalApi.getStateInfo(name);
      setStateInfo(getWikiPageExtract(res));
    })();
  }, [name]);

  return (
    <div className="State">
      <h1>{name}</h1>
      <div>
        <p>{stateInfo}</p>
        <PopulationGraph id={stateId} />
        <CommentsList usState={name} comments={comments} />
      </div>
    </div>
  );
};

export default State;
