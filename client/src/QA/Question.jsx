import React, {useState, useEffect, useRef} from 'react';
import AnswerList from './AnswerList.jsx';
import AddAnswer from './AddAnswer.jsx';
import axios from 'axios';

const Question = (props) => {

  // const [reported, setReported] = useState(false);
  const clicked = useRef(false);
  let searchedQuestion;
  if (props.search.length >= 3) {
    searchedQuestion = props.question.question_body.trim().split(new RegExp(`(${props.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i'));
    searchedQuestion.forEach((term, index) => {
      if (term.toUpperCase() === props.search.toUpperCase()) {
        searchedQuestion[index] = <mark key={index}>{term}</mark>
      }
    })
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
          <span className='qa-question-body'>
            {props.search.length >= 3
            ? searchedQuestion
            : props.question.question_body.trim()
            }
          </span>
          <span className='qa-question-actions'>
            {props.question.question_helpfulness === props.initialQuestionHelpfulness[props.question.question_id]
            ? <a href='#' onClick={(e) => {
                e.preventDefault();
                if (!clicked.current) {
                  clicked.current = true;
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
                }
              }}>Helpful?</a>
            : <>Helpful?</>
            } Yes ({props.question.question_helpfulness}) | <AddAnswer question={props.question} product_id={props.product_id} setQuestions={props.setQuestions} initialAnswerHelpfulness={props.initialAnswerHelpfulness} setInitialAnswerHelpfulness={props.setInitialAnswerHelpfulness} productName={props.productName} product_id={props.product_id}/>
            {/* | {reported
            ? <>Reported</>
            : <a href='#' onClick={(e) => {
                e.preventDefault();
                axios.put(`/qa/questions/${props.question.question_id}/report`)
                  .then(() => {
                    setReported(true);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}>Report</a>
            } */}
          </span>
        </div>
        <AnswerList answers={Object.values(props.question.answers)} question={props.question} initialAnswerHelpfulness={props.initialAnswerHelpfulness} product_id={props.product_id} setQuestions={props.setQuestions}/>
      </div>
    </>
  )
}

export default Question;