import React from "react";

const Answer = (props) => (
  <>
    <>{props.answer.body}</>
    <div>by {props.answer.answerer_name} | Helpful? ({props.answer.helpfulness}) | Report</div>
  </>
)

export default Answer;