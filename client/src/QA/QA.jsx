import React, {useState, useEffect} from "react";
import Search from "./Search.jsx";
import QuestionList from "./QuestionList.jsx";
import MoreQuestions from "./MoreQuestions.jsx";
import AddQuestion from "./AddQuestion.jsx";
import axios from "axios";

const QA = () => {

  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const [questionCount, setQuestionCount] = useState(4);

  let product_id = 37311;

  useEffect(() => {
    axios.get('/qa/questions', {
      params: {
        product_id: product_id,
        count: 10000
      }
    })
      .then((response) => {
        console.log(response.data.results);
        setQuestions(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <div id='qa' className='widget'>
      <h1>Questions</h1>
      {questions.length === 0
      ? null
      : <Search search={search} setSearch={setSearch}/>}
      <QuestionList questions={questions} search={search} questionCount={questionCount} setQuestions={setQuestions} product_id={product_id}/>
      {questions.length <=  questionCount
      ? null
      :<MoreQuestions questionCount={questionCount} setQuestionCount={setQuestionCount}/>}
      <AddQuestion questions={questions} setQuestions={setQuestions} product_id={product_id} questionCount={questionCount}/>
    </div>
  )

}

export default QA;