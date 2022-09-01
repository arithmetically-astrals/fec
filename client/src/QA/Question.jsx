import React, {useState, useEffect} from "react";
import AnswerList from "./AnswerList.jsx";
import AddAnswer from "./AddAnswer.jsx";
import axios from "axios";
import MoreAnswers from "./MoreAnswers.jsx";

const Question = (props) => {

  const [moreAnswers, setMoreAnswers] = useState(false);
  const [reported, setReported] = useState(false);

  return (
    <div>
      <div id='qa-question-container'>
        <h3 id='qa-question-tag'>Q:</h3>
        <span id='qa-question-body'>
          {props.question.question_body}
        </span>
        <span id='qa-question-actions'>
          {props.question.question_helpfulness === props.initialQuestionHelpfulness[props.question.question_id]
          ? <a href="#" onClick={(e) => {
              e.preventDefault();
              axios.put(`/qa/questions/${props.question.question_id}/helpful`)
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
          } Yes({props.question.question_helpfulness}) | <AddAnswer question={props.question} product_id={props.product_id} setQuestions={props.setQuestions} initialAnswerHelpfulness={props.initialAnswerHelpfulness} setInitialAnswerHelpfulness={props.setInitialAnswerHelpfulness}/> | {reported
          ? <>Reported</>
          : <a href="#" onClick={(e) => {
            e.preventDefault();
            axios.put(`/qa/questions/${props.question.question_id}/report`)
              .then(() => {
                setReported(true);
              })
              .catch((err) => {
                console.log(err);
              });
          }}>Report</a>
          }
        </span>
      </div>
      <AnswerList answers={Object.values(props.question.answers)} moreAnswers={moreAnswers} question_id={props.question.question_id} initialAnswerHelpfulness={props.initialAnswerHelpfulness} product_id={props.product_id} setQuestions={props.setQuestions}/>
      {Object.values(props.question.answers).length > 2
      ? <MoreAnswers moreAnswers={moreAnswers} setMoreAnswers={setMoreAnswers}/>
      : null}
    </div>
  )
}

export default Question;