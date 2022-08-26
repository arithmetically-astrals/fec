import React from "react";

const MoreQuestions = (props) => (
  <button onClick={() => {
    props.setMoreQuestions(!props.moreQuestions);
  }}>More Answered Questions</button>
)

export default MoreQuestions;