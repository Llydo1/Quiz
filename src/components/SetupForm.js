import React from "react";
import { useGlobalContext } from "../context";

const SetupForm = () => {
  const {
    quiz: { amount, category, difficulty },
    handleChange,
    handleSubmit,
    error,
  } = useGlobalContext();
  return (
    <section class="quiz quiz-small">
      <form class="setup-form">
        <h2>setup quiz</h2>
        {/* Amount  */}
        <div class="form-control">
          <label for="amount">number of questions</label>
          <input
            type="number"
            name="amount"
            id="amount"
            class="form-input"
            min={1}
            max={50}
            value={amount}
            onChange={handleChange}
          />
        </div>
        {/* Category */}
        <div class="form-control">
          <label for="category">category</label>
          <select
            name="category"
            id="category"
            class="form-input"
            value={category}
            onChange={handleChange}
          >
            <option value="sports">sports</option>
            <option value="history">history</option>
            <option value="politics">politics</option>
          </select>
        </div>
        {/* difficulty */}
        <div class="form-control">
          <label for="difficulty">select difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            class="form-input"
            value={difficulty}
            onChange={handleChange}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" class="submit-btn" onClick={handleSubmit}>
          start
        </button>
      </form>
    </section>
  );
};

export default SetupForm;
