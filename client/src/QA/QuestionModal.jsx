import React, {useState} from "react";
import axios from "axios";

const QuestionModal = (props) => {

  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emptyBody, setEmptyBody] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  return (
    <div id='qa-question-modal'>
      <h2 id='qa-question-modal-header'>Ask Your Question</h2>
      <h6 id='qa-question-modal-header'>About the {props.productName}</h6>
      <div>
        <div id='qa-question-modal-input'>
          <div>
            <label><b>Your Question* </b></label>
          </div>
          <div>
            <textarea id='qa-question-modal-textarea' maxLength='1000' rows="10" cols="80" onChange={(e) => {
              console.log(e.target.value);
              setBody(e.target.value);
            }}/>
          </div>
          {emptyBody
          ? <div id='qa-question-modal-error'>
              Question cannot be empty!
            </div>
          : null
          }
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
          {emptyName
          ? <div id='qa-question-modal-error'>
              Nickname cannot be empty!
            </div>
          : null
          }
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
          {emptyEmail
          ? <div id='qa-question-modal-error'>
              Email cannot be empty!
            </div>
          : null
          }
          {invalidEmail
          ? <div id='qa-question-modal-error'>
              Invalid email!
            </div>
          : null
          }
          <div>
            For authentication reasons, you will not be emailed
          </div>
        </div>
        <button id='qa-question-modal-button' onClick={(e) => {
          if (body === '') {
            setEmptyBody(true);
          } else {
            setEmptyBody(false);
          }
          if (name === '') {
            setEmptyName(true);
          } else {
            setEmptyName(false);
          }
          if (email === '') {
            setEmptyEmail(true);
          } else {
            setEmptyEmail(false);
            if (email === 'invalid') {
              setInvalidEmail(true);
            } else {
              setInvalidEmail(false);
            }
          }
          if (!emptyBody && !emptyName && !emptyEmail && !invalidEmail) {
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
            }
          }}>Submit</button>
      </div>
    </div>
  )
}

export default QuestionModal;