import React from "react";
import AnswerList from "./AnswerList.jsx";

const Question = (props) => (
  <div>
    Q: {props.question.question_body} Helpful? Yes({props.question.question_helpfulness}) | Add Answer
    <AnswerList answers={Object.values(props.question.answers)}/>
  </div>
)

export default Question;