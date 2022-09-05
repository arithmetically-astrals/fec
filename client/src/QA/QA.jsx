import React, {useState, useEffect} from "react";
import axios from "axios";
import QuestionModal from "./QuestionModal.jsx";
import Question from "./Question.jsx";

const QA = (props) => {

  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const [questionCount, setQuestionCount] = useState(4);
  const [initialQuestionHelpfulness, setInitialQuestionHelpfulness] = useState({});
  const [initialAnswerHelpfulness, setInitialAnswerHelpfulness] = useState({});
  const [productName, setProductName] = useState('');
  const [questionModal, setQuestionModal] = useState(false);

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
      ? <h2 className='qa-no-questions'>Be the first to ask a question...</h2>
      : <>
          <input id='qa-search' type="text" placeholder="Have a question? Search for answers…" onChange={(e) => {
            setSearch(e.target.value);
          }}></input>
          <div data-testid='questions' id='qa-questions'>
            {search.length < 3 || renderedQuestions.some((question) => (
              question.question_body.toUpperCase().indexOf(search.toUpperCase()) > -1
            ))
            ? renderedQuestions.map((question, index) => (
              <Question question={question} key={index} setQuestions={setQuestions} product_id={props.itemId} initialQuestionHelpfulness={initialQuestionHelpfulness} initialAnswerHelpfulness={initialAnswerHelpfulness} setInitialAnswerHelpfulness={setInitialAnswerHelpfulness} productName={productName} search={search}/>
            ))
            : <h2 className='qa-no-questions'>No questions found!</h2>
            }
          </div>
        </>
      }
      <div id='qa-button-container'>
        {(search.length >= 3 && searchedQuestions.length > renderedQuestions.length) || (search.length < 3 && questions.length > questionCount)
        ? <button className='qa-button' onClick={() => {
            setQuestionCount(questionCount + 2);
          }}>More Answered Questions</button>
        : null
        }
        <button className='qa-button' onClick={() => {
          setQuestionModal(true);
        }}>Add a question</button>
      </div>
    </div>
  )
}

export default QA;