import React from "react";
import Answer from "./Answer.jsx";

const AnswerList = (props) => (
  <div>
    {props.answers.map((answer, index) => (
      <Answer answer={answer} key={index}/>
    ))}
  </div>
)

export default AnswerList;