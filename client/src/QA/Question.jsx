import React, {useState, useEffect} from "react";
import AnswerList from "./AnswerList.jsx";
import AddAnswer from "./AddAnswer.jsx";
import axios from "axios";

const Question = (props) => {

  const [answers, setAnswers] = useState(Object.values(props.question.answers));

  return (
    <div>
      Q: {props.question.question_body}  <a href="#" onClick={(e) => {
        e.preventDefault();
        console.log('helpful question!');
      }}>Helpful?</a> Yes({props.question.question_helpfulness}) | <AddAnswer question_id={props.question.question_id} answers={props.question.answers} setAnswers={setAnswers}/> | <a href="#" onClick={(e) => {
        e.preventDefault();
        console.log('report question!');
      }}>Report</a>
      <AnswerList answers={answers}/>
    </div>
  )
}

export default Question;