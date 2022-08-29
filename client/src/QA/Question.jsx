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
      Q: {props.question.question_body} Helpful? Yes({props.question.question_helpfulness}) | <AddAnswer /> | Report
      <AnswerList answers={answers}/>
    </div>
  )
}

export default Question;