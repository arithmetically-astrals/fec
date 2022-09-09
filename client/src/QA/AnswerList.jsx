import React, {useState, useEffect} from 'react';
import Answer from './Answer.jsx';

const AnswerList = (props) => {

  const [moreAnswers, setMoreAnswers] = useState(false);
  const [renderedAnswers, setRenderedAnswers] = useState([]);

  useEffect(() => {
    props.answers.sort((a, b) => {
      return b.helpfulness - a.helpfulness;
    });
    for (let i = props.answers.length - 1; i > -1; i--) {
      if (props.answers[i].answerer_name.toUpperCase() === 'SELLER') {
        let answer = props.answers[i];
        props.answers.splice(i, 1);
        props.answers.unshift(answer);
      }
    }
    if (moreAnswers) {
      setRenderedAnswers(props.answers);
    } else {
      setRenderedAnswers(props.answers.slice(0, 2));
    }
  }, [props.question, moreAnswers])

  return (
    <div>
      {renderedAnswers.length
      ? <div className='qa-answer-container'>
          <h3 className='qa-answer-tag'>A: </h3>
          <div className='qa-answers'>
            {renderedAnswers.map((answer, index) => (
              <div key={index} className='qa-answer'>
                <Answer answer={answer} initialAnswerStates={props.initialAnswerStates} product_id={props.product_id} setQuestions={props.setQuestions}/>
              </div>
            ))}
            {Object.values(props.question.answers).length > 2
            ? <a href='#' onClick={(e) => {
                e.preventDefault();
                setMoreAnswers(!moreAnswers);
              }}>{moreAnswers ? 'Collapse answers' : 'See more answers'}</a>
            : null
            }
          </div>
        </div>
      : null
      }
    </div>
  )
}

export default AnswerList;