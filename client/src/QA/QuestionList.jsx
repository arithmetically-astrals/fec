import React from "react";
import Question from "./Question.jsx";

const QuestionList = (props) => (
  <div data-testid='questions' id='qa-questions'>
    {props.search.length < 3 || props.renderedQuestions.some((question) => (
      question.question_body.toUpperCase().indexOf(props.search.toUpperCase()) > -1
    ))
    ? props.renderedQuestions.map((question, index) => (
      <Question question={question} key={index} setQuestions={props.setQuestions} product_id={props.product_id} initialQuestionHelpfulness={props.initialQuestionHelpfulness} initialAnswerHelpfulness={props.initialAnswerHelpfulness} setInitialAnswerHelpfulness={props.setInitialAnswerHelpfulness} productName={props.productName} search={props.search}/>
    ))
    : <div>No questions found!</div>
    }
  </div>
)


export default QuestionList;