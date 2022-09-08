import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const AnswerModal = (props) => {

  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [emptyBody, setEmptyBody] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [, updateState] = React.useState();
  const modal = useRef(null);

  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    const delta = 6;
    let startX;
    let startY;
    const handleOutsideClick = (e) => {
      if (modal.current && !modal.current.contains(e.target)) {
        props.setAnswerModal(false);
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

  let classObj = {
    qaClose: 'qa-close',
    qaModal: 'qa-modal',
    qaModalInput: 'qa-modal-input',
    qaModalButton: 'qa-button'
  };
  if (document.getElementsByClassName('bodyDark').length) {
    for (let key in classObj) {
      classObj[key] += '-dark';
    }
  }

  return (
    <div className='modal-background'>
      <div className={classObj.qaClose}/>
      <div data-testid='answer-modal' className={classObj.qaModal} ref={modal}>
        <h2 className='qa-modal-title'>Submit Your Answer</h2>
        <h5 className='qa-modal-title'>{props.productName}: {props.question.question_body}</h5>
        <div>
          <div className='qa-modal-header'>
            <div>
              <label><b>Your Answer* </b></label>
            </div>
            <div>
              <textarea className={classObj.qaModalInput} maxLength='1000' rows='10' cols='80' onChange={(e) => {
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
          <div className='qa-modal-header'>
            <div>
              <label><b>What is your nickname* </b></label>
            </div>
            <div>
              <input className={classObj.qaModalInput} type='text' maxLength='60' placeholder='Example: jack543!' onChange={(e) => {
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
          <div className='qa-modal-header'>
            <div>
              <label><b>Your email* </b></label>
            </div>
            <div>
              <input className={classObj.qaModalInput} type='text' maxLength='60' placeholder='Example: jack@email.com' onChange={(e) => {
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
          <div className='qa-modal-header'>
            <div>
              <label><b>Upload your photos</b></label>
            </div>
            <div>
              {photos.length === 5
              ? null
              : <div>
                  <div>
                    {photos.length !== 4
                    ? <>You can upload {5 - photos.length} more pictures</>
                    : <>You can upload 1 more picture</>
                    }
                  </div>
                  <input id='uploadphoto' type='file' multiple='multiple' style={{display: 'none'}} onChange={() => {
                    let preview = document.querySelector('.qa-modal-photo:not(.filled)');
                    let caption = document.querySelector('.qa-modal-caption:not(.filled)');
                    let file = document.querySelector('input[type=file]').files[0];
                    let url = URL.createObjectURL(file);
                    preview.src = url;
                    preview.classList.add('filled');
                    caption.innerHTML = file.name;
                    caption.classList.add('filled');
                    let photosClone = photos;
                    photosClone.push(url);
                    setPhotos(photosClone);
                    forceUpdate();
                  }}/>
                  <input className={classObj.qaModalButton} type='button' value='Upload a photo...' onClick={() => {
                    document.getElementById('uploadphoto').click();
                  }}/>
                </div>
              }
              <div style={{display: photos.length ? 'initial' : 'none'}}>
                <figure className='qa-modal-photos'>
                  <img className='qa-modal-photo' src='' height='130'/>
                  <figcaption className='qa-modal-caption'/>
                </figure>
                <figure className='qa-modal-photos'>
                  <img className='qa-modal-photo' src='' height='130'/>
                  <figcaption className='qa-modal-caption'/>
                </figure>
                <figure className='qa-modal-photos'>
                  <img className='qa-modal-photo' src='' height='130'/>
                  <figcaption className='qa-modal-caption'/>
                </figure >
                <figure className='qa-modal-photos'>
                  <img className='qa-modal-photo' src='' height='130'/>
                  <figcaption className='qa-modal-caption'/>
                </figure>
                <figure className='qa-modal-photos'>
                  <img className='qa-modal-photo' src='' height='130'/>
                  <figcaption className='qa-modal-caption'/>
                </figure>
              </div>
            </div>
          </div>
          <button className={`qa-modal-header ${classObj.qaModalButton}`} onClick={(e) => {
            let sendRequest = true;
            let alertMessages = [];
            if (body.trim() === '') {
              setEmptyBody(true);
              sendRequest = false;
              alertMessages.push('A valid answer body');
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
              props.setAnswerModal(false);
              axios.post(`/qa/questions/${props.question.question_id}/answers`, {
                body: body.trim(),
                name: name.trim(),
                email: email.trim(),
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
            } else {
              alert(`You must enter the following:\n${alertMessages.join('\n')}`);
            }
            }}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default AnswerModal;