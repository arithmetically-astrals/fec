import React, {useState, useEffect, useRef} from "react";
import axios from "axios";

const QuestionModal = (props) => {

  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emptyBody, setEmptyBody] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const modal = useRef(null);
  const initialLoad = useRef(true);

  const closeModal = (ref) => {
    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          if (initialLoad.current) {
            initialLoad.current = false;
          } else {
            props.setQuestionModal(false);
          }
        }
      }
      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      }
    }, [ref]);
  }

  closeModal(modal);

  return (
    <div id='qa-modal' ref={modal}>
      <h2 id='qa-modal-header'>Ask Your Question</h2>
      <h6 id='qa-modal-header'>About the {props.productName}</h6>
      <div>
        <div id='qa-modal-input'>
          <div>
            <label><b>Your Question* </b></label>
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
            <input type='text' maxLength='60' placeholder='Example: jackson11!' onChange={(e) => {
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
            <input type='text' maxLength='60' placeholder='Why did you like the product or not?' onChange={(e) => {
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
            setInvalidEmail(false);
            setEmptyEmail(true);
            sendRequest = false;
          } else {
            setEmptyEmail(false);
            if (email.toLowerCase().match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) === null) {
              setInvalidEmail(true);
              sendRequest = false;
            } else {
              setInvalidEmail(false);
            }
          }
          if (sendRequest) {
            props.setQuestionModal(false);
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