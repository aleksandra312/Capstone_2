import React from "react";
import { Link } from "react-router-dom";
import "./stylesheets/CommentCard.css";

function CommentCard({ username, createDate, comment, isRelocate }) {
  return (
    <div className="CommentCard">
      <div className="card-body">
        <h6 className="card-title">
          <p>{createDate}</p>
          <p>{username}</p>
        </h6>
        <p>
          <small>{comment}</small>
        </p>
      </div>
    </div>
  );
}

export default CommentCard;
