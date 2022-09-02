import React, {useState, useEffect, useRef} from "react";
import axios from "axios";

const AnswerModal = (props) => {

  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
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
            props.setAnswerModal(false);
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

  const previewFile = () => {
    let preview = document.querySelector('#qa-modal-photos');
    let file = document.querySelector('input[type=file]').files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      preview.src = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
    }
  }

  return (
    <div id='qa-modal' ref={modal}>
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
            <input type='text' maxLength='60' placeholder='Example: jack@email.com' onChange={(e) => {
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
            <input type='file' onChange={previewFile} multiple='multiple'/>
            <img id='qa-modal-photos' src='' height='200' alt='Image preview...' />
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
            props.setAnswerModal(false);
            axios.post(`/qa/questions/${props.question.question_id}/answers`, {
              body: body,
              name: name,
              email: email,
              photos: photos
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