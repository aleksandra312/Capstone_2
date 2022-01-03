import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import StatesMap from "./state/StatesMap";
import State from "./state/State";
import StatesRankingsList from "./survey/StatesRankingsList";
import NewCommentForm from "./survey/NewCommentForm";
import ExternalApi from "./api/externalApi";
import StatesTrendsApi from "./api/statesTrendsApi";
import LoadingSpinner from "./LoadingSpinner";
import NavBar from "./navigation/NavBar";
import StatesContext from "./StatesContext";
import { v4 as uuid } from "uuid";

function App() {
  const [statesData, setStatesData] = useState(null);
  const [stateInfo, setStateInfo] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setStatesMap();
  }, []);

  useEffect(() => {
    setStateComments();
  }, [stateInfo]);

  async function setStatesMap() {
    const statesData = await ExternalApi.getStatesData();
    setStatesData(statesData);
  }

  async function setStateComments() {
    let comments = await StatesTrendsApi.getComments(stateInfo.stateName);
    setComments(comments);
  }

  async function handleAddComment(newComment) {
    setComments((prevComment) => [
      ...prevComment,
      { ...newComment, id: uuid() },
    ]);
    await StatesTrendsApi.postComment(newComment);
  }

  if (!statesData) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <StatesContext.Provider value={{ stateInfo, setStateInfo, statesData }}>
        <div className="App">
          <NavBar />
          <Routes>
            <Route exact path="/" element={<StatesMap />} />
            <Route
              path="/state/:name"
              element={<State comments={comments} />}
            />
            <Route
              path="/state/:name/trend/new"
              element={<NewCommentForm addComment={handleAddComment} />}
            />
            <Route
              exact
              path="/states/trend"
              element={<StatesRankingsList />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </StatesContext.Provider>
    </BrowserRouter>
  );
}

export default App;
