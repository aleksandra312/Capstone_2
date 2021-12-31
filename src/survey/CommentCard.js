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
        </h6>
        <p>{comment}</p>
        <footer className="card-subtitle mb-2 text-muted">
          <cite>
            {isRelocate ? (
              <p>I would like to move here.</p>
            ) : (
              <p>I would not move here.</p>
            )}
          </cite>
        </footer>
      </div>
    </div>
  );
}

export default CommentCard;
