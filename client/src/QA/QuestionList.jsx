import React from "react";
import Question from "./Question.jsx";

const QuestionList = (props) => {

  let renderedQuestions = [];
  if (props.search.length >= 3) {
    let i = 0;
    let j = 0;
    while (i < props.questionCount && j < props.questions.length) {
      if (props.questions[j].question_body.toUpperCase().includes(props.search.toUpperCase())) {
        i++;
        renderedQuestions.push(props.questions[j]);
      }
      j++;
    }
  } else {
    for (let i = 0; i < props.questionCount; i++) {
      renderedQuestions.push(props.questions[i]);
    }
  }

  return (
    <div data-testid='questions'>
      {!props.questions.length
      ? <div>Be the first to ask a question...</div>
      : props.search.length >= 3
        ? props.questions.some((question) => (
            question.question_body.toUpperCase().indexOf(props.search.toUpperCase()) > -1
          ))
          ? renderedQuestions.map((question, index) => (
            <Question question={question} key={index} setQuestions={props.setQuestions} product_id={props.product_id}/>
          ))
          : <div>No questions found!</div>
        : renderedQuestions.map((question, index) => (
          <Question question={question} key={index} setQuestions={props.setQuestions} product_id={props.product_id}/>
        ))
      }
    </div>
  )
}

export default QuestionList;