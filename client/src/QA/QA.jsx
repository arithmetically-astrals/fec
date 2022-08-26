import React, {useState} from "react";
import Search from "./Search.jsx";
import QuestionList from "./QuestionList.jsx";
import MoreQuestions from "./MoreQuestions.jsx";
import AddQuestion from "./AddQuestion.jsx";

const QA = () => {

  const [questions, setQuestions] = useState([{question: '??'}]);

  return (
    <div>
      <h1>Questions</h1>
      <Search />
      <QuestionList questions={questions}/>
      <MoreQuestions />
      <AddQuestion />
    </div>
  )
}

export default QA;