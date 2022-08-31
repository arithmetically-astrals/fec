import React from "react";
import axios from "axios";

const Answer = (props) => (
  <>
    {props.answer.body}
    <div>by {props.answer.answerer_name}, {new Date(props.answer.date).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})} | <a href="#" onClick={(e) => {
      e.preventDefault();
      console.log('props.answer', props.answer);
      console.log('props.question_id', props.question_id);
      axios.put(`/qa/answers/${props.answer.id || props.answer.answer_id}/helpful`, {
        helpfulness: props.answer.helpfulness + 1
      })
        .then(() => {
          axios.get(`/qa/questions/:question_id/answers`, {
            params: {
              question_id: props.question_id,
              count: 10000
            }
          })
            .then((response) => {
              //sort by seller, then helpfulness
              props.setAnswers(response.data.results);
            })
            .catch((err) => {
              console.log(err);
            })
        })
        .catch((err) => {
          console.log(err);
        });
    }}>Helpful?</a> ({props.answer.helpfulness}) | <a href="#" onClick={(e) => {
      e.preventDefault();
      console.log('report answer!');
    }}>Report</a></div>
  </>
)

export default Answer;