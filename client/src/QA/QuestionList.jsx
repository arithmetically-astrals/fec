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
      if (props.questions[i]) {
        renderedQuestions.push(props.questions[i]);
      }
    }
  }

  return (
    <div data-testid='questions' id='qa-questions'>
      {props.search.length < 3 || props.questions.some((question) => (
        question.question_body.toUpperCase().indexOf(props.search.toUpperCase()) > -1
      ))
      ? renderedQuestions.map((question, index) => (
        <Question question={question} key={index} setQuestions={props.setQuestions} product_id={props.product_id} initialQuestionHelpfulness={props.initialQuestionHelpfulness} initialAnswerHelpfulness={props.initialAnswerHelpfulness} setInitialAnswerHelpfulness={props.setInitialAnswerHelpfulness} productName={props.productName} search={props.search}/>
      ))
      : <div>No questions found!</div>
      }
    </div>
  )
}

export default QuestionList;