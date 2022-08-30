import React from "react";
import Question from "./Question.jsx";

const QuestionList = (props) => (
  <div>
    {props.search.length >= 3
    ? props.questions.map((question, index) => {
      let emptyRender = true;
      if (question.question_body.includes(props.search)) {
        emptyRender = false;
        return <Question question={question} key={index}/>
      }
      if (emptyRender) {
        return <div key={index}>No questions found!</div>
      }
    })
    : props.questions.map((question, index) => (
        <Question question={question} key={index}/>
    ))}
    {props.questions.length === 0
    ? <div>No questions found!</div>
    : <></>
    }
  </div>
)

export default QuestionList;