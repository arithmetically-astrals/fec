import React, {useState, useEffect, useRef} from "react";
import AnswerList from "./AnswerList.jsx";
import AddAnswer from "./AddAnswer.jsx";
import axios from "axios";

const Question = (props) => {

  const [reported, setReported] = useState(false);
  const clicked = useRef(false);
  let searchedQuestion;
  if (props.search.length >= 3) {
    searchedQuestion = props.question.question_body.split(new RegExp(`(${props.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i'));
    searchedQuestion.forEach((term, index) => {
      if (term.toUpperCase() === props.search.toUpperCase()) {
        searchedQuestion[index] = <mark key={index}>{term}</mark>
      }
    })
  }

  return (
    <div>
      <div className='qa-question-container'>
        <h3 className='qa-question-tag'>Q:</h3>
        <span className='qa-question-body'>
          {props.search.length >= 3
          ? searchedQuestion
          : props.question.question_body
          }
        </span>
        <span className='qa-question-actions'>
          {props.question.question_helpfulness === props.initialQuestionHelpfulness[props.question.question_className]
          ? <a href="#" onClick={(e) => {
              e.preventDefault();
              if (!clicked.current) {
                clicked.current = true;
                axios.put(`/qa/questions/${props.question.question_className}/helpful`)
                .then(() => {
                  axios.get('/qa/questions', {
                    params: {
                      product_className: props.product_className,
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
          : <>Helpful!</>
          } Yes({props.question.question_helpfulness}) | <AddAnswer question={props.question} product_className={props.product_className} setQuestions={props.setQuestions} initialAnswerHelpfulness={props.initialAnswerHelpfulness} setInitialAnswerHelpfulness={props.setInitialAnswerHelpfulness} productName={props.productName}/> | {reported
          ? <>Reported</>
          : <a href="#" onClick={(e) => {
              e.preventDefault();
              axios.put(`/qa/questions/${props.question.question_className}/report`)
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
      <AnswerList answers={Object.values(props.question.answers)} question={props.question} initialAnswerHelpfulness={props.initialAnswerHelpfulness} product_className={props.product_className} setQuestions={props.setQuestions}/>
    </div>
  )
}

export default Question;