import React from "react";
import "../stylesheets/StateInfo.css";

function StateInfo({ name, stateDescr }) {
  return (
    <div className="StateInfo">
      <h1>{name}</h1>
      {stateDescr.length ? (
        <p>{stateDescr}</p>
      ) : (
        <p className="lead">
          Information about the state is not available at the moment. Please try
          again later.
        </p>
      )}
    </div>
  );
}

export default StateInfo;
