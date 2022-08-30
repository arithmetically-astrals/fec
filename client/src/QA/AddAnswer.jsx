import React from "react";
import axios from "axios";

const AddAnswer = (props) => (
  <a href="#" onClick={(e) => {
    e.preventDefault();
    console.log('add an answer!');
    console.log('props.question_id', props.question_id)
    //modal popup
    axios.post(`/qa/questions/${props.question_id}/answers`, {
      params: {
        body: 'temporary answer',
        name: 'John Doe',
        email: 'fakeemail@fakecompany.com',
        photos: []
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }}>Add Answer</a>
)

export default AddAnswer;