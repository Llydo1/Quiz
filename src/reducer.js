import React from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "WAITING": {
      return { ...state, wating: true };
    }
    case "LOADING": {
      return { ...state, loading: true, waiting: false };
    }
    case "SHOW_QUESTION": {
      return {
        ...state,
        questions: action.payload,
        loading: false,
        waiting: false,
        error: false,
      };
    }
    case "ERROR": {
      return { ...state, waiting: true, error: true };
    }
    case "SUBMIT_QUIZ": {
      return { ...state, isModalOpen: true, correct: action.payload };
    }
    case "PLAY_AGAIN": {
      return {
        waiting: true,
        loading: true,
        questions: [],
        correct: 0,
        error: false,
        quiz: {
          amount: 5,
          category: "sports",
          difficulty: "easy",
        },
        isModalOpen: false,
      };
    }
    default:
      throw new Error(`No match ${action.type} action`);
  }
};

export default reducer;
