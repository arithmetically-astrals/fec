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
    <div>
      {renderedAnswers.length
      ? <div>
          A: {renderedAnswers.map((answer, index) => (
            <div key={index}>
              <Answer answer={answer} question_id={props.question_id} setAnswers={props.setAnswers}/>
            </div>
          ))}
        </div>
      : null
      }
    </div>
  )
}

export default AnswerList;