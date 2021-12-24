import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import StatesMap from "./StatesMap";
import State from "./State";

function App() {
  const US_MAP_URL =
    "https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json";

  const [statesData, setStatesData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(US_MAP_URL);
      const statesData = await res.json();
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
