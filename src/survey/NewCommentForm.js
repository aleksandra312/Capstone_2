import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFields from "../hooks/useFields";
import moment from "moment";
import "../stylesheets/NewCommentForm.css";
import { Link } from "react-router-dom";
import StatesContext from "../StatesContext";

function NewCommentForm({ addComment }) {
  const { stateInfo } = useContext(StatesContext);
  const usState = stateInfo.stateName;

  const INITIAL_STATE = {
    createDate: "",
    username: "",
    usState: "",
    comment: "",
    isRelocate: "true",
  };

  const [formData, handleChange, resetForm] = useFields(INITIAL_STATE);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const newComment = generateNewComment();
    addComment(newComment);
    navigate(`/state/${usState}`);
  }

  const generateNewComment = () => {
    const createDate = moment(new Date()).format("YYYY-MM-DD");
    let username = "testuser1";
    let { comment, isRelocate } = formData;
    isRelocate = isRelocate === "true";
    return {
      createDate,
      username,
      usState,
      comment,
      isRelocate,
    };
  };

  return (
    <form
      className="NewCommentForm col-md-8 offset-md-2"
      onSubmit={handleSubmit}
    >
      <div class="form-group">
        <label htmlFor="isRelocate">Would you move to {usState}?</label>
        <select
          className="form-control form-select"
          type="text"
          id="isRelocate"
          name="isRelocate"
          value={formData.isRelocate}
          onChange={handleChange}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div class="form-group">
        <label htmlFor="comment">Tell us why</label>
        <textarea
          className="form-control"
          id="comment"
          type="text"
          name="comment"
          rows="3"
          value={formData.comment}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button className="btn btn-outline-success">Add</button>
    </form>
  );
}

export default NewCommentForm;
