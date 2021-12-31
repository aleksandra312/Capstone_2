import React from "react";
import "../stylesheets/StateInfo.css";

function StateInfo({ name, stateInfo }) {
  return (
    <div className="StateInfo col-md-8 offset-md-2">
      <h1>{name}</h1>
      {stateInfo.length ? (
        <p>{stateInfo}</p>
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
