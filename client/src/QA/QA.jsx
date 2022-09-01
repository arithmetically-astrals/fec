import React, {useState, useEffect} from "react";
import Search from "./Search.jsx";
import QuestionList from "./QuestionList.jsx";
import MoreQuestions from "./MoreQuestions.jsx";
import AddQuestion from "./AddQuestion.jsx";
import axios from "axios";

const QA = (props) => {

  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const [questionCount, setQuestionCount] = useState(4);
  const [initialQuestionHelpfulness, setInitialQuestionHelpfulness] = useState({});
  const [initialAnswerHelpfulness, setInitialAnswerHelpfulness] = useState({});
  const [productName, setProductName] = useState('');

  let product_id = props.itemId;

  useEffect(() => {
    axios.get('/qa/questions', {
      params: {
        product_id: product_id,
        count: 10000
      }
    })
      .then((response) => {
        let tempObj = {};
        response.data.results.forEach((question) => {
          tempObj[question.question_id] = question.question_helpfulness;
        })
        setInitialQuestionHelpfulness(tempObj);
        tempObj = {};
        response.data.results.forEach((question) => {
          Object.keys(question.answers).forEach((id) => {
            tempObj[id] = question.answers[id].helpfulness;
          })
        })
        setInitialAnswerHelpfulness(tempObj);
        setQuestions(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get(`/products/item`, {
      params: {
        product_id: props.itemId
      }
    })
      .then((response) => {
        setProductName(response.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.itemId]);

  return (
    <div id='qa' className='widget'>
      <h1>Questions</h1>
      {questions.length === 0
      ? <div>Be the first to ask a question...</div>
      : <>
          <Search search={search} setSearch={setSearch}/>
          <QuestionList questions={questions} search={search} questionCount={questionCount} setQuestions={setQuestions} product_id={product_id} initialQuestionHelpfulness={initialQuestionHelpfulness} initialAnswerHelpfulness={initialAnswerHelpfulness} setInitialAnswerHelpfulness={setInitialAnswerHelpfulness}/>
          {questions.length <= questionCount
          ? null
          : <MoreQuestions questionCount={questionCount} setQuestionCount={setQuestionCount}/>
          }
        </>
      }
      <AddQuestion questions={questions} setQuestions={setQuestions} product_id={product_id} questionCount={questionCount} setInitialQuestionHelpfulness={setInitialQuestionHelpfulness} initialQuestionHelpfulness={initialQuestionHelpfulness} productName={productName}/>
    </div>
  )

}

export default QA;