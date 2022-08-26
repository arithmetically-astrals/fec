import React, {useState} from "react";
import Search from "./Search.jsx";
import QuestionList from "./QuestionList.jsx";
import MoreQuestions from "./MoreQuestions.jsx";
import AddQuestion from "./AddQuestion.jsx";

const QA = () => {

  const [questions, setQuestions] = useState([{text: 'This is a question', answers: ['This is an answer', 'and so is this']}]);

  return (
    <div>
      <h1>Questions</h1>
      <Search />
      <QuestionList questions={questions}/>
      <MoreQuestions />
      <AddQuestion questions={questions} setQuestions={setQuestions}/>
    </div>
  )
}

export default QA;