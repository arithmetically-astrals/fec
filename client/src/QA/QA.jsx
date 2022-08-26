import React from "react";
import Search from "./Search.jsx";
import QuestionList from "./QuestionList.jsx";
import MoreQuestions from "./MoreQuestions.jsx";
import AddQuestion from "./AddQuestion.jsx";

const QA = () => (
  <div>
    <h1>Questions</h1>
    <Search />
    <QuestionList />
    <MoreQuestions />
    <AddQuestion />
  </div>
)

export default QA;