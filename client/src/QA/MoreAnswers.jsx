import React from "react";

const MoreAnswers = (props) => (
  <button onClick={() => {
    props.setMoreAnswers(!props.moreAnswers);
  }}>More Answers</button>
)

export default MoreAnswers;