import React from "react";
import Answer from "./Answer.jsx";

const AnswerList = (props) => {

  //sort by seller, then helpfulness
  let renderedAnswers = [];
  if (props.moreAnswers) {
    renderedAnswers = props.answers;
  } else {
    if (props.answers[0]) {
      renderedAnswers.push(props.answers[0]);
    }
    if (props.answers[1]) {
      renderedAnswers.push(props.answers[1]);
    }
  }

  return (
    <div>
      {renderedAnswers.length
      ? <div>
          A: {renderedAnswers.map((answer, index) => (
            <div key={index}>
              <Answer answer={answer} />
            </div>
          ))}
        </div>
      : <></>
      }
    </div>
  )
}

export default AnswerList;