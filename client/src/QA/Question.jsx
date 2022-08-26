import React from "react";
import AnswerList from "./AnswerList.jsx";

const Question = (props) => (
  <div>
    Q: {props.question.text}
    <AnswerList answers={props.question.answers}/>
  </div>
)

export default Question;