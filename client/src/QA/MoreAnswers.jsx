import React from "react";

const MoreAnswers = (props) => (
  <a href="#" onClick={(e) => {
    e.preventDefault();
    props.setMoreAnswers(!props.moreAnswers);
  }}>{!props.moreAnswers ? 'See more answers' : 'Collapse answers'}</a>
)

export default MoreAnswers;