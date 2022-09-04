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

  useEffect(() => {
    const delta = 6;
    let startX;
    let startY;
    const handleOutsideClick = (e) => {
      if (modal.current && !modal.current.contains(e.target)) {
        props.setQuestionModal(false);
      }
    };
    const handleMouseDown = (e) => {
      startX = e.pageX;
      startY = e.pageY;
    };
    const handleMouseUp = (e) => {
      const diffX = Math.abs(e.pageX - startX);
      const diffY = Math.abs(e.pageY - startY);
      if (diffX < delta && diffY < delta) {
        handleOutsideClick(e);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [modal]);

  return (
    <div className='qa-modal-background'>
      <a href="#" className="qa-close" />
      <div className='qa-modal' ref={modal}>
        <h2 className='qa-modal-header'>Ask Your Question</h2>
        <h6 className='qa-modal-header'>About the {props.productName}</h6>
        <div>
          <div className='qa-modal-input'>
            <div>
              <label><b>Your Question* </b></label>
            </div>
            <div>
              <textarea className='qa-modal-textarea' maxLength='1000' rows="10" cols="80" onChange={(e) => {
                setBody(e.target.value);
              }}/>
            </div>
            {emptyBody
            ? <div className='qa-modal-error'>
                Question cannot be empty!
              </div>
            : null
            }
          </div>
          <div className='qa-modal-input'>
            <div>
              <label><b>What is your nickname* </b></label>
            </div>
            <div>
              <input type='text' maxLength='60' placeholder='Example: jackson11!' onChange={(e) => {
                setName(e.target.value);
              }}/>
            </div>
            {emptyName
            ? <div className='qa-modal-error'>
                Nickname cannot be empty!
              </div>
            : null
            }
            <div>
              For privacy reasons, do not use your full name or email address
            </div>
          </div>
          <div className='qa-modal-input'>
            <div>
              <label><b>Your email* </b></label>
            </div>
            <div>
              <input type='text' maxLength='60' placeholder='Why did you like the product or not?' onChange={(e) => {
                setEmail(e.target.value);
              }}/>
            </div>
            {emptyEmail
            ? <div className='qa-modal-error'>
                Email cannot be empty!
              </div>
            : null
            }
            {invalidEmail
            ? <div className='qa-modal-error'>
                Invalid email!
              </div>
            : null
            }
            <div>
              For authentication reasons, you will not be emailed
            </div>
          </div>
          <button className='qa-modal-button' onClick={(e) => {
            let sendRequest = true;
            let alertMessages = [];
            if (body.trim() === '') {
              setEmptyBody(true);
              sendRequest = false;
              alertMessages.push('A valid question body');
            } else {
              setEmptyBody(false);
            }
            if (name.trim() === '') {
              setEmptyName(true);
              sendRequest = false;
              alertMessages.push('A valid nickname');
            } else {
              setEmptyName(false);
            }
            if (email.trim() === '') {
              setInvalidEmail(false);
              setEmptyEmail(true);
              sendRequest = false;
              alertMessages.push('A valid email');
            } else {
              setEmptyEmail(false);
              if (email.toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ) === null) {
                setInvalidEmail(true);
                sendRequest = false;
                alertMessages.push('A valid email');
              } else {
                setInvalidEmail(false);
              }
            }
            if (sendRequest) {
              props.setQuestionModal(false);
              axios.post('/qa/questions', {
                body: body.trim(),
                name: name.trim(),
                email: email.trim(),
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
            } else {
              alert(`You must enter the following:\n${alertMessages.join('\n')}`);
            }
            }}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default QuestionModal;