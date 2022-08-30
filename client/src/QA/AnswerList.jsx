import React from "react";
import Answer from "./Answer.jsx";

const AnswerList = (props) => (
  <div>
    A: {Object.keys(props.answers).map((id, index) => (
      <div key={index}>
        <Answer answer={props.answers[id]} />
      </div>
    ))}
  </div>
)

export default AnswerList;