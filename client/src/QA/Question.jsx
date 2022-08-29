import React, {useState, useEffect} from "react";
import AnswerList from "./AnswerList.jsx";
import AddAnswer from "./AddAnswer.jsx";
import axios from "axios";

const Question = (props) => {

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios.get('/qa/questions/:question_id/answers', {
      params: {
        question_id: props.question.question_id
      }
    })
      .then((response) => {
        setAnswers(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <div>
      Q: {props.question.question_body}  <a href="#" onClick={(e) => {
        e.preventDefault();
        console.log('helpful question!');
      }}>Helpful?</a> Yes({props.question.question_helpfulness}) | <AddAnswer /> | <a href="#" onClick={(e) => {
        e.preventDefault();
        console.log('report question!');
      }}>Report</a>
      <AnswerList answers={answers}/>
    </div>
  )
}

export default Question;