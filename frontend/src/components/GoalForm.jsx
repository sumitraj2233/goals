import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { reset, createGoal } from "../features/goals/goalSlice";

export const GoalForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    dispatch(createGoal({ text }));
    dispatch(reset());
    e.preventDefault();
    setText("");
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Enter goal"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
};
