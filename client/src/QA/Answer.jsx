import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import PhotoModal from "./PhotoModal.jsx";

const Answer = (props) => {

  const [reported, setReported] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);
  const clicked = useRef(false);
  const clickedPhoto = useRef(null);

  useEffect(() => {
    const allElements = document.body.getElementsByTagName('*');
    if (document.getElementsByClassName('bodyDark').length) {
      for (let i = 0; i < allElements.length; i++) {
        allElements[i].classList.add('borderDark');
        allElements[i].classList.add('textDark');
      }
    }
  }, [])

  return (
    <>
      {props.answer.body}
      {photoModal
      ? <PhotoModal setPhotoModal={setPhotoModal} clickedPhoto={clickedPhoto.current}/>
      : null
      }
      {props.answer.photos.length
      ? <div>
          {props.answer.photos.map((photo, index) => (
            <img className='qa-answer-photos' src={photo} key={index} height='80' onClick={() => {
              clickedPhoto.current = photo;
              setPhotoModal(true);
            }}/>
          ))}
        </div>
      : null
      }
      <div className='qa-answer-actions'>by {props.answer.answerer_name.toUpperCase() === 'SELLER'
      ? <b>{props.answer.answerer_name}</b>
      : props.answer.answerer_name
      }, {new Date(props.answer.date).toLocaleDateString('en-us', {
        year: 'numeric', month: 'short', day: 'numeric'
      })} | {props.answer.helpfulness === props.initialAnswerHelpfulness[props.answer.id]
      ? <a href='#' onClick={(e) => {
        e.preventDefault();
        if (!clicked.current) {
          clicked.current = true;
          axios.put(`/qa/answers/${props.answer.id}/helpful`)
          .then(() => {
            axios.get('/qa/questions', {
              params: {
                product_id: props.product_id,
                count: 10000
              }
            })
              .then((response) => {
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
      }}>Helpful?</a>
      : <>Helpful?</>
      } Yes ({props.answer.helpfulness}) | {reported
      ? <>Reported</>
      : <a href='#' onClick={(e) => {
        e.preventDefault();
        axios.put(`/qa/answers/${props.answer.id}/report`)
          .then(() => {
            setReported(true);
          })
          .catch((err) => {
            console.log(err);
          });
      }}>Report</a>
      }
      </div>
    </>
  )
}

export default Answer;