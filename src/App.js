import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import StatesMap from "./StatesMap";
import State from "./State";
import NewCommentForm from "./NewCommentForm";
import ExternalApi from "./api/externalApi";
import StatesTrendsApi from "./api/statesTrendsApi";
import { v4 as uuid } from "uuid";

function App() {
  const [statesData, setStatesData] = useState(null);
  const [stateInfo, setStateInfo] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setStatesMap();
  }, []);

  useEffect(() => {
    getStateComments();
  }, [stateInfo]);

  async function setStatesMap() {
    const statesData = await ExternalApi.getStatesData();
    setStatesData(statesData);
  }

  async function getStateComments() {
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
            element={
              <StatesMap statesData={statesData} setStateInfo={setStateInfo} />
            }
          />
          <Route
            path="/state/:name"
            element={<State stateId={stateInfo.stateId} comments={comments} />}
          />
          <Route
            path="/state/:name/trend/new"
            element={
              <NewCommentForm
                addComment={handleAddComment}
                usState={stateInfo.stateName}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
