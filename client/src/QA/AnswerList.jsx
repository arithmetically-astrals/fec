import React from "react";
import Answer from "./Answer.jsx";

const AnswerList = (props) => {

  let sellerAnswers = [];
  let normalAnswers = [];
  props.answers.forEach((answer) => {
    if (answer.answerer_name.toUpperCase() === 'SELLER') {
      sellerAnswers.push(answer);
    } else {
      normalAnswers.push(answer);
    }
  })
  sellerAnswers.sort((a, b) => {
    return b.helpfulness - a.helpfulness;
  });
  normalAnswers.sort((a, b) => {
    return b.helpfulness - a.helpfulness;
  });
  let sortedAnswers = sellerAnswers.concat(normalAnswers);

  let renderedAnswers = [];

  if (props.moreAnswers) {
    renderedAnswers = sortedAnswers;
  } else {
    if (props.answers[0]) {
      renderedAnswers.push(sortedAnswers[0]);
    }
    if (props.answers[1]) {
      renderedAnswers.push(sortedAnswers[1]);
    }
  }

  return (
    <div id='qa-answer-list'>
      {renderedAnswers.length
      ? <div id='qa-answer-container'>
          <h3 id='qa-answer-tag'>A: </h3>
          <div id='qa-answers'>
            {renderedAnswers.map((answer, index) => (
              <div key={index}>
                <Answer answer={answer} question_id={props.question_id} initialAnswerHelpfulness={props.initialAnswerHelpfulness} product_id={props.product_id} setQuestions={props.setQuestions}/>
              </div>
            ))}
          </div>
        </div>
      : null
      }
    </div>
  )
}

export default AnswerList;