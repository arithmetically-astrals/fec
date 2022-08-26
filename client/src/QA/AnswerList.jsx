import React from "react";
import Answer from "./Answer.jsx";

const AnswerList = (props) => (
  <div>
    {props.answers.map((answer, index) => (
      <div>
        A: <Answer answer={answer} key={index}/>
      </div>
    ))}
  </div>
)

export default AnswerList;