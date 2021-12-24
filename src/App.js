import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import StatesMap from "./StatesMap";
import State from "./State";
import StatesApi from "./api";

function App() {
  const [statesData, setStatesData] = useState(null);

  useEffect(() => {
    (async () => {
      const statesData = await StatesApi.getStatesData();
      setStatesData(statesData);
    })();
  }, []);

  if (!statesData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<StatesMap statesData={statesData} />}
          />
          <Route path="/state/:name" element={<State />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
