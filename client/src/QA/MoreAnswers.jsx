import React from "react";

const MoreAnswers = (props) => (
  <button onClick={() => {
    props.setMoreAnswers(!props.moreAnswers);
    console.log(props.moreAnswers);
  }}>See more answers</button>
)

export default MoreAnswers;