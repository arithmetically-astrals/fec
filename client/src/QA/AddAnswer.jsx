import React from "react";
import axios from "axios";

const AddAnswer = (props) => (
  <a href="#" onClick={(e) => {
    e.preventDefault();
    //modal popup with body, name, email, photos
    axios.post(`/qa/questions/${props.question_id}/answers`, {
      body: 'temporary answer',
      name: 'John Doe',
      email: 'fakeemail@fakecompany.com',
      photos: []
    })
      .then(() => {
        axios.get('/qa/questions/:question_id/answers', {
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
  }}>Add Answer</a>
)

export default AddAnswer;