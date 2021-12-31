import React from "react";

function StateInfo({ stateInfo }) {
  return (
    <div className="StateInfo">
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
