import React from "react";
import axios from "axios";

const AddAnswer = (props) => (
  <a href="#" onClick={(e) => {
    e.preventDefault();
    console.log('add an answer!');
    console.log('props.question_id', props.question_id)
    //modal popup with body, name, email, photos
    axios.post(`/qa/questions/${props.question_id}/answers`, {
      params: {
        body: 'temporary answer',
        name: 'John Doe',
        email: 'fakeemail@fakecompany.com',
        photos: []
      }
    })
      .then(() => {
        axios.get('/qa/questions/:question_id/answers', {
          params: {
            question_id: props.question_id,
            count: 10000
          }
        })
          .then((response) => {
            props.setAnswers(response.data.results);
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      });
  }}>Add Answer</a>
)

export default AddAnswer;