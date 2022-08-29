import React from "react";
import Question from "./Question.jsx";

const QuestionList = (props) => (
  <div>
    {props.search.length >= 3
    ? <div>hello</div>
    : props.questions.map((question, index) => (
      <Question question={question} key={index}/>
    ))}
  </div>
)

export default QuestionList;