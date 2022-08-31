import React, {useState, useEffect} from "react";
import AnswerList from "./AnswerList.jsx";
import AddAnswer from "./AddAnswer.jsx";
import axios from "axios";
import MoreAnswers from "./MoreAnswers.jsx";

const Question = (props) => {

  const [answers, setAnswers] = useState([]);
  const [moreAnswers, setMoreAnswers] = useState(false);

  useEffect(() => {
    setAnswers(Object.values(props.question.answers));
  }, [props.question]);

  return (
    <div>
      Q: {props.question.question_body}  <a href="#" onClick={(e) => {
        e.preventDefault();
        axios.put(`/qa/questions/${props.question.question_id}/helpful`, {
          question_helpfulness: props.question.question_helpfulness + 1
        })
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
              })
          })
          .catch((err) => {
            console.log(err);
          });
      }}>Helpful?</a> Yes({props.question.question_helpfulness}) | <AddAnswer question_id={props.question.question_id} answers={props.question.answers} setAnswers={setAnswers}/> | <a href="#" onClick={(e) => {
        e.preventDefault();
        console.log('report question!');
      }}>Report</a>
      <AnswerList answers={answers} moreAnswers={moreAnswers}/>
      {answers.length > 2
      ? <MoreAnswers moreAnswers={moreAnswers} setMoreAnswers={setMoreAnswers}/>
      : null}
    </div>
  )
}

export default Question;