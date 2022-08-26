import React from "react";
import Answer from "./Answer.jsx";

const AnswerList = (props) => (
  <div>
    {props.answers.map((answer, index) => (
      <div key={index}>
        A: <Answer answer={answer}/>
      </div>
    ))}
  </div>
)

export default AnswerList;