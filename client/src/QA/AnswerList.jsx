import React, {useState, useEffect} from "react";
import Answer from "./Answer.jsx";
import MoreAnswers from "./MoreAnswers.jsx";

const AnswerList = (props) => {

  const [moreAnswers, setMoreAnswers] = useState(false);
  const [renderedAnswers, setRenderedAnswers] = useState([]);

  useEffect(() => {
    let sellerAnswers = [];
    let normalAnswers = [];
    props.answers.forEach((answer) => {
      if (answer.answerer_name.toUpperCase() === 'SELLER') {
        sellerAnswers.push(answer);
      } else {
        normalAnswers.push(answer);
      }
    })
    sellerAnswers.sort((a, b) => {
      return b.helpfulness - a.helpfulness;
    });
    normalAnswers.sort((a, b) => {
      return b.helpfulness - a.helpfulness;
    });
    let sortedAnswers = sellerAnswers.concat(normalAnswers);

    let truncatedSortedAnswers = [];

    if (moreAnswers) {
      setRenderedAnswers(sortedAnswers);
    } else {
      if (props.answers[0]) {
        truncatedSortedAnswers.push(sortedAnswers[0]);
      }
      if (props.answers[1]) {
        truncatedSortedAnswers.push(sortedAnswers[1]);
      }
      setRenderedAnswers(truncatedSortedAnswers);
    }
  }, [moreAnswers])

  return (
    <div>
      {renderedAnswers.length
      ? <div id='qa-answer-container'>
          <h3 id='qa-answer-tag'>A: </h3>
          <div id='qa-answers'>
            {renderedAnswers.map((answer, index) => (
              <div key={index} id='qa-answer'>
                <Answer answer={answer} initialAnswerHelpfulness={props.initialAnswerHelpfulness} product_id={props.product_id} setQuestions={props.setQuestions}/>
              </div>
            ))}
            {Object.values(props.question.answers).length > 2
            ? <MoreAnswers id='qa-more-answers' moreAnswers={moreAnswers} setMoreAnswers={setMoreAnswers}/>
            : null}
          </div>
        </div>
      : null
      }
    </div>
  )
}

export default AnswerList;