import React, {useState, useEffect} from "react";
import axios from "axios";

const Answer = (props) => {

  const [reported, setReported] = useState(false);

  return (
    <>
      {props.answer.body}
      <div>by {props.answer.answerer_name.toUpperCase() === 'SELLER'
      ? <b>{props.answer.answerer_name}</b>
      : props.answer.answerer_name
      }, {new Date(props.answer.date).toLocaleDateString('en-us', {
        year: 'numeric', month: 'short', day: 'numeric'
      })} | {props.answer.helpfulness === props.initialAnswerHelpfulness[props.answer.id]
      ? <a href="#" onClick={(e) => {
        e.preventDefault();
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
      }}>Helpful?</a>
      : <>Helpful!</>
      } ({props.answer.helpfulness}) | {reported
      ? <>Reported</>
      : <a href="#" onClick={(e) => {
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