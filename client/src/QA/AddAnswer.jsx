import React, {useState} from "react";
import axios from "axios";

const AddAnswer = (props) => {

  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState('');

  return (
    <a href="#" onClick={(e) => {
      e.preventDefault();
      //modal popup with body, name, email, photos
      axios.post(`/qa/questions/${props.question.question_id}/answers`, {
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
              let tempObj = props.initialAnswerHelpfulness;
              response.data.results.forEach((question) => {
                Object.keys(question.answers).forEach((id) => {
                  if (props.initialAnswerHelpfulness[id] === undefined) {
                    tempObj[id] = question.answers[id].helpfulness;
                  }
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
}

export default AddAnswer;