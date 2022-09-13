import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";

const Quizzes = ({ data }) => {
  const { submitQuiz } = useGlobalContext();
  const [questions, setQuestions] = useState(data);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const { question, answers, correct_answer, choice } =
    questions[currentQuestion];
  const setChoice = (choice) => {
    const newQuestions = questions.map((question, index) => {
      if (index === currentQuestion) return { ...question, choice: choice };
      return question;
    });
    setQuestions(newQuestions);
  };

  return (
    <section className="quiz">
      <p className="correct-answers">
        Questions:{currentQuestion + 1}/{questions.length}{" "}
      </p>
      <article className="container">
        <h2 dangerouslySetInnerHTML={{ __html: question }} />
        <div className="btn-container">
          {answers.map((answer, index) => (
            <button
              key={index}
              className={`answer-btn ${
                index === choice ? "answer-selected" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: answer }}
              onClick={() => setChoice(index)}
            ></button>
          ))}
        </div>
      </article>
      <div className="button-container">
        <button
          className="button-question"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
        >
          prev question
        </button>
        {currentQuestion !== questions.length - 1 ? (
          <button
            className="button-question"
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
          >
            next question
          </button>
        ) : (
          <button
            className="button-question"
            onClick={() => submitQuiz(questions)}
          >
            Submit
          </button>
        )}
      </div>
    </section>
  );
};

export default Quizzes;
