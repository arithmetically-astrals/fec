import React from "react";

const QuestionList = (props) => (
  <div>
    {props.questions.map((question, index) => (
      <div key={index}>!!!</div>
    ))}
  </div>
)

export default QuestionList;