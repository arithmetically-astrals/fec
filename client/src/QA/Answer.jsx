import React, {useState, useEffect} from "react";
import axios from "axios";

var tempStorage = {};

const Answer = (props) => {

  const [initialAnswerHelpfulness, setInitialAnswerHelpfulness] = useState({});
  const [reported, setReported] = useState(false);

  useEffect(() => {
    if (tempStorage[props.answer.answer_id] === undefined) {
      tempStorage[props.answer.answer_id] = props.answer.helpfulness;
    }
    setInitialAnswerHelpfulness(tempStorage);
  }, [props.answer]);

  return (
    <>
      {props.answer.body}
      <div>by {props.answer.answerer_name.toUpperCase() === 'SELLER'
      ? <b>{props.answer.answerer_name}</b>
      : props.answer.answerer_name
      }, {new Date(props.answer.date).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})} | {props.answer.helpfulness === initialAnswerHelpfulness[props.answer.answer_id]
      ? <a href="#" onClick={(e) => {
        e.preventDefault();
        axios.put(`/qa/answers/${props.answer.answer_id}/helpful`)
          .then(() => {
            axios.get(`/qa/questions/:question_id/answers`, {
              params: {
                question_id: props.question_id,
                count: 10000
              }
            })
              .then((response) => {
                props.setAnswers(response.data.results);
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
        axios.put(`/qa/answers/${props.answer.answer_id}/report`)
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