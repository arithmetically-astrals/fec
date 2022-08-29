import React from "react";

const MoreQuestions = (props) => (
  <button onClick={() => {
    props.setQuestionCount(props.questionCount + 2);
  }}>More Answered Questions</button>
)

export default MoreQuestions;