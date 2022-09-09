import React, {useState, useEffect, useRef} from 'react';
import AnswerList from './AnswerList.jsx';
import AddAnswer from './AddAnswer.jsx';
import axios from 'axios';

const Question = (props) => {

  const clicked = useRef(false);
  let renderedQuestion;
  if (props.search.length >= 3) {
    renderedQuestion = props.question.question_body.trim().split(new RegExp(`(${props.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i'));
    renderedQuestion.forEach((term, index) => {
      if (term.toUpperCase() === props.search.toUpperCase()) {
        renderedQuestion[index] = <mark key={index}>{term}</mark>
      }
    })
  } else {
    renderedQuestion = props.question.question_body.trim();
  }

  useEffect(() => {
    if (document.getElementsByClassName('bodyDark').length) {
      const allElements = document.body.getElementsByTagName('*');
      for (let i = 0; i < allElements.length; i++) {
        allElements[i].classList.add('borderDark');
        allElements[i].classList.add('textDark');
      }
    }
  }, [])

  return (
    <>
      <div data-testid='question' className={document.getElementsByClassName('bodyDark').length
      ? 'qa-question-container qa-question-container-dark'
      : 'qa-question-container'
      }>
        <div className='qa-question-header'>
          <h3 className='qa-question-tag'>Q:</h3>
          <span className='qa-question-body'>{renderedQuestion}</span>
          <span className='qa-question-actions'>
            {props.initialQuestionStates.current[props.question.question_id][0]
            ? <>Helpful?</>
            : <a href='#' onClick={(e) => {
                e.preventDefault();
                if (!clicked.current) {
                  clicked.current = true;
                  axios.put(`/qa/questions/${props.question.question_id}/helpful`)
                  .then(() => {
                    props.initialQuestionStates.current[props.question.question_id][0] = true;
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
            } Yes ({props.question.question_helpfulness}) | <AddAnswer question={props.question} product_id={props.product_id} setQuestions={props.setQuestions} initialAnswerStates={props.initialAnswerStates} productName={props.productName} product_id={props.product_id}/>
            {/* | {props.initialQuestionStates.current[props.question.question_id][1]
            ? <>Reported</>
            : <a href='#' onClick={(e) => {
                e.preventDefault();
                axios.put(`/qa/questions/${props.question.question_id}/report`)
                  .then(() => {
                    props.initialQuestionStates.current[props.question.question_id][1] = true;
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}>Report</a>
            } */}
          </span>
        </div>
        <AnswerList answers={Object.values(props.question.answers)} question={props.question} initialAnswerStates={props.initialAnswerStates} product_id={props.product_id} setQuestions={props.setQuestions}/>
      </div>
    </>
  )
}

export default Question;