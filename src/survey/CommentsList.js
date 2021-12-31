import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import StatesTrendsApi from "../api/statesTrendsApi";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

function CommentsList({ usState, comments }) {
  return (
    <div className="CompanyList col-md-8 offset-md-2">
      {comments.length ? (
        <div className="CompanyList-list">
          {comments.map((c) => (
            <CommentCard
              key={c.id}
              username={c.username}
              createDate={c.createDate}
              comment={c.comment}
              isRelocate={c.isRelocate}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Be the first one to start the trend!</p>
      )}
      <Link
        id="new-comment"
        className="NewCommentForm add-form"
        to={`/state/${usState}/trend/new`}
        key={uuid()}
      >
        <button className="add-comment btn btn-success">Add New</button>
      </Link>
    </div>
  );
}

export default CommentsList;
