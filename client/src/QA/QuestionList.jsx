import React from "react";
import Question from "./Question.jsx";

const QuestionList = (props) => (
  <div>
    {props.search.length >= 3
    ? props.questions.map((question, index) => {
      if (question.question_body.includes(props.search)) {
        return <Question question={question} key={index}/>
      }
    })
    : props.questions.map((question, index) => (
      <Question question={question} key={index}/>
    ))}
  </div>
)

export default QuestionList;