import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./components/SetupForm";
import Loading from "./components/Loading";
import Modal from "./components/Modal";
function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();
  if (waiting) return <SetupForm />;
  if (loading) return <Loading />;

  console.log(index);
  const { correct_answer, incorrect_answers, question } = questions[index];
  const answers = [...incorrect_answers, correct_answer];

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          Correct answer: {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => (
              <button
                key={index}
                className="answer-btn"
                dangerouslySetInnerHTML={{ __html: answer }}
                onClick={() => checkAnswer(answer === correct_answer)}
              ></button>
            ))}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
