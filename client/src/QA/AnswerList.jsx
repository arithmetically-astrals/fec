import React from "react";
import Answer from "./Answer.jsx";

const AnswerList = (props) => {

  let renderedAnswers = [];

  return (
    <div>
      A: {props.answers.map((answer, index) => (
        <div key={index}>
          <Answer answer={answer} />
        </div>
      ))}
    </div>
  )
}

export default AnswerList;