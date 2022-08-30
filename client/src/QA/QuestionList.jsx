import React from "react";
import Question from "./Question.jsx";

const QuestionList = (props) => (
  <div>
    {props.questions.length === 0
    ? <div>Be the first to ask a question...</div>
    : props.search.length >= 3
    ? props.questions.some((question) => (
        question.question_body.toUpperCase().indexOf(props.search.toUpperCase()) > -1
      ))
      ? props.questions.map((question, index) => {
          if (question.question_body.toUpperCase().includes(props.search.toUpperCase())) {
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