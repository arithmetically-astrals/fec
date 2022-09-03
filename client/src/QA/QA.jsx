import React, {useState, useEffect} from "react";
import Search from "./Search.jsx";
import QuestionList from "./QuestionList.jsx";
import MoreQuestions from "./MoreQuestions.jsx";
import axios from "axios";
import QuestionModal from "./QuestionModal.jsx";
import BlurToggle from "../Shared/BlurToggle.jsx";

const QA = (props) => {

  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const [questionCount, setQuestionCount] = useState(4);
  const [initialQuestionHelpfulness, setInitialQuestionHelpfulness] = useState({});
  const [initialAnswerHelpfulness, setInitialAnswerHelpfulness] = useState({});
  const [productName, setProductName] = useState('');
  const [questionModal, setQuestionModal] = useState(false);
  const [answerModal, setAnswerModal] = useState(false);

  let renderedQuestions = [];
  let searchedQuestions = [];
  if (search.length >= 3) {
    questions.forEach((question) => {
      if (question.question_body.toUpperCase().includes(search.toUpperCase())) {
        searchedQuestions.push(question);
      }
    })
    for (let i = 0; i < questionCount; i++) {
      if (searchedQuestions[i]) {
        renderedQuestions.push(searchedQuestions[i]);
      }
    }
  } else {
    for (let i = 0; i < questionCount; i++) {
      if (questions[i]) {
        renderedQuestions.push(questions[i]);
      }
    }
  }

  useEffect(() => {
    axios.get('/qa/questions', {
      params: {
        product_id: props.itemId,
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
      {questionModal
      ? <QuestionModal productName={productName} initialQuestionHelpfulness={initialQuestionHelpfulness} setInitialQuestionHelpfulness={setInitialQuestionHelpfulness} setQuestions={setQuestions} product_id={props.itemId} setQuestionModal={setQuestionModal}/>
      : null
      }
      <h1>Questions</h1>
      {questions.length === 0
      ? <div>Be the first to ask a question...</div>
      : <>
          <Search search={search} setSearch={setSearch}/>
          <QuestionList search={search} setQuestions={setQuestions} product_id={props.itemId} initialQuestionHelpfulness={initialQuestionHelpfulness} initialAnswerHelpfulness={initialAnswerHelpfulness} setInitialAnswerHelpfulness={setInitialAnswerHelpfulness} productName={productName} renderedQuestions={renderedQuestions}/>
          {(search.length >= 3 && searchedQuestions.length > renderedQuestions.length) || (search.length < 3 && questions.length > questionCount)
          ? <MoreQuestions questionCount={questionCount} setQuestionCount={setQuestionCount}/>
          : null
          }
        </>
      }
      <button onClick={() => {
        // BlurToggle();
        setQuestionModal(true);
      }}>Add a question</button>
    </div>
  )

}

export default QA;