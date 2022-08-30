import React from "react";
import Question from "./Question.jsx";

const QuestionList = (props) => (
  <div>
    {props.questions.length === 0
    ? <div>No questions found!</div>
    : props.search.length >= 3
    ? props.questions.some((question) => (
        question.question_body.indexOf(props.search) > -1
      ))
      ? props.questions.map((question, index) => {
          if (question.question_body.includes(props.search)) {
            return <Question question={question} key={index}/>
          }
        })
      : <div>No questions found!</div>
    : props.questions.map((question, index) => (
        <Question question={question} key={index}/>
    ))}
  </div>
)

export default QuestionList;