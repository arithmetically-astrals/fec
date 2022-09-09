import React, {useState, useEffect} from 'react';
import Answer from './Answer.jsx';

const AnswerList = (props) => {

  const [moreAnswers, setMoreAnswers] = useState(false);
  const [renderedAnswers, setRenderedAnswers] = useState([]);

  useEffect(() => {
    props.answers.sort((a, b) => {
      return b.helpfulness - a.helpfulness;
    });
    let sortedAnswers = [];
    props.answers.forEach((answer) => {
      if (answer.answerer_name.toUpperCase() === 'SELLER') {
        sortedAnswers.unshift(answer);
      } else {
        sortedAnswers.push(answer);
      }
    })
    if (moreAnswers) {
      setRenderedAnswers(sortedAnswers);
    } else {
      setRenderedAnswers(sortedAnswers.slice(0, 2));
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