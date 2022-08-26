import React from "react";
import Question from "./Question.jsx";

const QuestionList = (props) => (
  <div>
    {props.questions.map((question, index) => (
      <Question question={question} key={index}/>
    ))}
  </div>
)

export default QuestionList;