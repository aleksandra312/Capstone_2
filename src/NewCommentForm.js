import React from "react";
import { useNavigate } from "react-router-dom";
import useFields from "./hooks/useFields";
import moment from "moment";

function NewCommentForm({ addComment, usState }) {
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
    console.log("NEW", newComment);
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="isRelocate">Would you move here?</label>
      <select
        type="text"
        id="isRelocate"
        name="isRelocate"
        value={formData.isRelocate}
        onChange={handleChange}
      >
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
      <label htmlFor="comment">Tell us why</label>
      <input
        id="comment"
        type="text"
        name="comment"
        value={formData.comment}
        onChange={handleChange}
      />
      <button>Add</button>
    </form>
  );
}

export default NewCommentForm;
