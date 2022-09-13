import React from "react";
import { useGlobalContext } from "../context";

const Modal = () => {
  const { isModalOpen, playAgain, correct, questions } = useGlobalContext();
  return (
    <div
      className={`${
        isModalOpen ? "modal-container isOpen" : "modal-container"
      }`}
    >
      <div className="modal-content">
        <h2>congrats</h2>
        <p>
          You answered of {((correct / questions.length) * 100).toFixed(0)}%
          questions correctly
        </p>
        <button className="close-btn btn" onClick={playAgain}>
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
