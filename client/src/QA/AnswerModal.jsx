import React, {useState} from "react";
import axios from "axios";

const AnswerModal = (props) => {

  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState('');
  const [emptyBody, setEmptyBody] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  return (
    <div id='qa-modal'>
      <h2 id='qa-modal-header'>Submit Your Answer</h2>
      <h6 id='qa-modal-header'>{props.productName}: {props.question.question_body}</h6>
      <div>
        <div id='qa-modal-input'>
          <div>
            <label><b>Your Answer* </b></label>
          </div>
          <div>
            <textarea id='qa-modal-textarea' maxLength='1000' rows="10" cols="80" onChange={(e) => {
              setBody(e.target.value);
            }}/>
          </div>
          {emptyBody
          ? <div id='qa-modal-error'>
              Question cannot be empty!
            </div>
          : null
          }
        </div>
        <div id='qa-modal-input'>
          <div>
            <label><b>What is your nickname* </b></label>
          </div>
          <div>
            <input type='text' maxLength='60' placeholder='Example: jack543!' onChange={(e) => {
              setName(e.target.value);
            }}/>
          </div>
          {emptyName
          ? <div id='qa-modal-error'>
              Nickname cannot be empty!
            </div>
          : null
          }
          <div>
            For privacy reasons, do not use your full name or email address
          </div>
        </div>
        <div id='qa-modal-input'>
          <div>
            <label><b>Your email* </b></label>
          </div>
          <div>
            <input type='text' placeholder='Why did you like the product or not?' onChange={(e) => {
              setEmail(e.target.value);
            }}/>
          </div>
          {emptyEmail
          ? <div id='qa-modal-error'>
              Email cannot be empty!
            </div>
          : null
          }
          {invalidEmail
          ? <div id='qa-modal-error'>
              Invalid email!
            </div>
          : null
          }
          <div>
            For authentication reasons, you will not be emailed
          </div>
        </div>
        <div id='qa-modal-input'>
          <div>
            <label><b>Upload your photos</b></label>
          </div>
          <div>
            <button>Upload</button>
          </div>
        </div>
        <button id='qa-modal-button' onClick={(e) => {
          let sendRequest = true;
          if (body === '') {
            setEmptyBody(true);
            sendRequest = false;
          } else {
            setEmptyBody(false);
          }
          if (name === '') {
            setEmptyName(true);
            sendRequest = false;
          } else {
            setEmptyName(false);
          }
          if (email === '') {
            setEmptyEmail(true);
            sendRequest = false;
          } else {
            setEmptyEmail(false);
            if ((email.substr(-4) !== '.com' && email.substr(-4) !== '.edu' && email.substr(-4) !== '.gov') || email.indexOf('@') === -1 || email.substr(0, 1) === '@' || email.substr(-5, 1) === '@') {
              setInvalidEmail(true);
              sendRequest = false;
            } else {
              setInvalidEmail(false);
            }
          }
          if (sendRequest) {
            props.setQuestionModal(false);
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
          }
          }}>Submit</button>
      </div>
    </div>
  )
}

export default AnswerModal;