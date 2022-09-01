import React, {useState} from "react";
import axios from "axios";
import BlurToggle from "../Shared/BlurToggle.jsx";

const AddQuestion = (props) => {

  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [questionModal, setQuestionModal] = useState(null);

  return (
    <>
      {questionModal}
      <button onClick={() => {
        // BlurToggle();
        setQuestionModal(<div id='qa-question-modal'>
          <h2 id='qa-question-modal-header'>Ask Your Question</h2>
          <h6 id='qa-question-modal-header'>About the {props.productName}</h6>
          <div>
            <div id='qa-question-modal-input'>
              <div>
                <label><b>Your Question* </b></label>
              </div>
              <div>
                <textarea id='qa-question-modal-textarea' maxLength='1000' rows="10" cols="80" onChange={(e) => {
                  setBody(e.target.value);
                }}/>
              </div>
            </div>
            <div id='qa-question-modal-input'>
              <div>
                <label><b>What is your nickname* </b></label>
              </div>
              <div>
                <input type='text' placeholder='Example: jackson11!' onChange={(e) => {
                  setName(e.target.value);
                }}/>
              </div>
              <div>
                For privacy reasons, do not use your full name or email address
              </div>
            </div>
            <div id='qa-question-modal-input'>
              <div>
                <label><b>Your email* </b></label>
              </div>
              <div>
                <input type='text' placeholder='Why did you like the product or not?' onChange={(e) => {
                  setEmail(e.target.value);
                }}/>
              </div>
              <div>
                For authentication reasons, you will not be emailed
              </div>
            </div>
            <button id='qa-question-modal-button' onClick={(e) => {
              console.log(body);
              axios.post('/qa/questions', {
                body: body,
                name: name,
                email: email,
                product_id: props.product_id
              })
                .then(() => {
                  axios.get('/qa/questions', {
                    params: {
                      product_id: props.product_id,
                      count: 10000
                    }
                  })
                    .then((response) => {
                      let tempObj = props.initialQuestionHelpfulness;
                      response.data.results.forEach((question) => {
                        if (props.initialQuestionHelpfulness[question.question_id] === undefined) {
                          tempObj[question.question_id] = question.question_helpfulness;
                        }
                      })
                      props.setInitialQuestionHelpfulness(tempObj);
                      props.setQuestions(response.data.results);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
              }}>Submit</button>
          </div>
        </div>);

      }}>Add a question</button>
    </>
  )
}

export default AddQuestion;