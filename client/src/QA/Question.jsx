import React, {useState, useEffect} from "react";
import AnswerList from "./AnswerList.jsx";
import AddAnswer from "./AddAnswer.jsx";
import axios from "axios";
import MoreAnswers from "./MoreAnswers.jsx";

const Question = (props) => {

  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    setAnswers(Object.values(props.question.answers));
  }, [props.question])

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
      {answers.length > 2
      ? <MoreAnswers />
      : <></>}
    </div>
  )
}

export default Question;