import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./components/SetupForm";
import Loading from "./components/Loading";
import Modal from "./components/Modal";
import Quizzes from "./components/Quizzes";
function App() {
  const { waiting, loading, questions } = useGlobalContext();
  const newQuizzes = questions.map((quizz) => {
    return {
      question: quizz.question,
      correct_answer: quizz.correct_answer,
      answers: [...quizz.incorrect_answers, quizz.correct_answer],
      choice: null,
    };
  });
  if (waiting) return <SetupForm />;
  if (loading) return <Loading />;
  return (
    <main>
      <Modal />
      <Quizzes data={newQuizzes} />
    </main>
  );
}

export default App;
