import React, {useState, useEffect} from "react";
import AnswerList from "./AnswerList.jsx";
import AddAnswer from "./AddAnswer.jsx";
import axios from "axios";
import MoreAnswers from "./MoreAnswers.jsx";

var tempStorage = {};

const Question = (props) => {

  const [answers, setAnswers] = useState([]);
  const [moreAnswers, setMoreAnswers] = useState(false);
  const [initialQuestionHelpfulness, setInitialQuestionHelpfulness] = useState({});
  const [reported, setReported] = useState(false);


  useEffect(() => {
    setAnswers(Object.values(props.question.answers));
    if (tempStorage[props.question.question_id] === undefined) {
     tempStorage[props.question.question_id] = props.question.question_helpfulness;
    }
    setInitialQuestionHelpfulness(tempStorage);
  }, [props.question]);

  return (
    <div>
      Q: {props.question.question_body} {props.question.question_helpfulness === initialQuestionHelpfulness[props.question.question_id]
      ? <a href="#" onClick={(e) => {
          e.preventDefault();
          axios.put(`/qa/questions/${props.question.question_id}/helpful`)
            .then(() => {
              axios.get('/qa/questions', {
                params: {
                  product_id: props.product_id,
                  count: 10000
                }
              })
                .then((response) => {
                  response.data.results.forEach((question) => {
                    if (Object.values(question.answers).length !== 0) {
                      Object.values(question.answers).forEach((answerObj) => {
                        answerObj.answer_id = answerObj.id;
                        delete answerObj.id;
                      })
                    }
                  })
                  props.setQuestions(response.data.results);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
      }}>Helpful?</a>
      : <>Helpful!</>
      } Yes({props.question.question_helpfulness}) | <AddAnswer question_id={props.question.question_id} answers={props.question.answers} setAnswers={setAnswers}/> | {reported
      ? <>Reported</>
      : <a href="#" onClick={(e) => {
        e.preventDefault();
        axios.put(`/qa/questions/${props.question.question_id}/report`)
          .then(() => {
            setReported(true);
          })
          .catch((err) => {
            console.log(err);
          });
      }}>Report</a>
      }

      <AnswerList answers={answers} moreAnswers={moreAnswers} question_id={props.question.question_id} setAnswers={setAnswers}/>
      {answers.length > 2
      ? <MoreAnswers moreAnswers={moreAnswers} setMoreAnswers={setMoreAnswers}/>
      : null}
    </div>
  )
}

export default Question;