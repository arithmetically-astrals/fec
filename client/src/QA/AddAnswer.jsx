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
        axios.get('/qa/questions', {
          params: {
            product_id: props.product_id,
            count: 10000
          }
        })
          .then((response) => {
            let tempObj = {};
            response.data.results.forEach((question) => {
              Object.keys(question.answers).forEach((id) => {
                tempObj[id] = question.answers[id].helpfulness;
              })
            })
            props.setInitialAnswerHelpfulness(tempObj);
            props.setQuestions(response.data.results);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }}>Add Answer</a>
)

export default AddAnswer;