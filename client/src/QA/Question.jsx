import React from "react";
import AnswerList from "./AnswerList.jsx";
import AddAnswer from "./AddAnswer.jsx";

const Question = (props) => (
  <div>
    Q: {props.question.question_body} Helpful? Yes({props.question.question_helpfulness}) | <AddAnswer /> | Report
    <AnswerList answers={Object.values(props.question.answers)}/>
  </div>
)

export default Question;