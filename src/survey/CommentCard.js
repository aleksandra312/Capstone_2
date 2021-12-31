import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/CommentCard.css";
import { formatDate } from "../helpers/helpers";

function CommentCard({ username, createDate, comment, isRelocate }) {
  return (
    <div className="CommentCard">
      <div className="card-body">
        <h6 className="card-title">
          <p>{formatDate(createDate)}</p>
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
