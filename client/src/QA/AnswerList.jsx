import React from "react";
import Answer from "./Answer.jsx";

const AnswerList = (props) => (
  <div>
    {console.log(props.answers)}
    A: {props.answers.map((answer, index) => (
      <div key={index}>
        <Answer answer={answer} />
      </div>
    ))}
  </div>
)

export default AnswerList;