import axios from "axios";
import React, { useState, useContext, useReducer } from "react";
import reducer from "./reducer";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};
const initialState = {
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
const API_ENDPOINT = "https://opentdb.com/api.php?";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchQuestion = async (url) => {
    dispatch({ type: "LOADING" });
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        dispatch({ type: "SHOW_QUESTION", payload: data });
      } else {
        dispatch({ type: "ERROR" });
      }
    } else {
      dispatch({ type: "WAITING" });
    }
  };

  //submit quizzes
  const submitQuiz = (questions) => {
    const correct = questions.reduce((number, question) => {
      if (question.answers[question.choice] === question.correct_answer)
        return number + 1;
      return number;
    }, 0);
    dispatch({ type: "SUBMIT_QUIZ", payload: correct });
  };

  //Waiting form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const quiz = {};
    quiz.amount = document.querySelector(`.form-control input`).value || 5;
    document.querySelectorAll(`.form-control select`).forEach((element) => {
      quiz[element.name] = element.value;
    });

    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    fetchQuestion(url);
  };

  //play again
  const playAgain = () => {
    dispatch({ type: "PLAY_AGAIN" });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleSubmit,
        submitQuiz,
        playAgain,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
