import React from "react";

const MoreAnswers = (props) => (
  <button onClick={() => {
    props.setMoreAnswers(!props.moreAnswers);
    console.log(props.moreAnswers);
  }}>{!props.moreAnswers ? 'See more answers' : 'Collapse answers'}</button>
)

export default MoreAnswers;