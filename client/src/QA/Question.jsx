import React from "react";
import AnswerList from "./AnswerList.jsx";

const Question = (props) => (
  <div>
    Q: {props.question.question_body}
    <AnswerList answers={Object.values(props.question.answers)}/>
  </div>
)

export default Question;