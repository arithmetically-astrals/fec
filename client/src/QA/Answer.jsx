import React from "react";



const Answer = (props) => (
  <>
    {props.answer.body}
    <div>by {props.answer.answerer_name}, {new Date(props.answer.date).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})} | <a href="#" onClick={(e) => {
      e.preventDefault();
      console.log('helpful answer!');
    }}>Helpful?</a> ({props.answer.helpfulness}) | <a href="#" onClick={(e) => {
      e.preventDefault();
      console.log('report answer!');
    }}>Report</a></div>
  </>
)

export default Answer;