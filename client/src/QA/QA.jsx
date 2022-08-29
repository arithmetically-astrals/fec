import React, {useState, useEffect} from "react";
import Search from "./Search.jsx";
import QuestionList from "./QuestionList.jsx";
import MoreQuestions from "./MoreQuestions.jsx";
import AddQuestion from "./AddQuestion.jsx";
import axios from "axios";

const QA = () => {

  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/qa/questions', {
      params: {
        product_id: 37312
      }
    })
      .then((response) => {
        setQuestions(response.data.results);
        console.log(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const renderMoreQuestions = () => {
    console.log('render more questions!');
  }

  return (
    <div>
      <h1>Questions</h1>
      <Search search={search} setSearch={setSearch}/>
      <QuestionList questions={questions} search={search}/>
      <MoreQuestions renderMoreQuestions={renderMoreQuestions}/>
      <AddQuestion questions={questions} setQuestions={setQuestions}/>
    </div>
  )

}

export default QA;