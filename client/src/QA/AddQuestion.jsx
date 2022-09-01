import React, {useState} from "react";
import axios from "axios";
import BlurToggle from "../Shared/BlurToggle.jsx";
import QuestionModal from "./QuestionModal.jsx";

const AddQuestion = (props) => {

  const [questionModal, setQuestionModal] = useState(false);

  return (
    <>
      {questionModal
      ? <QuestionModal productName={props.productName} initialQuestionHelpfulness={props.initialQuestionHelpfulness} setInitialQuestionHelpfulness={props.setInitialQuestionHelpfulness} setQuestions={props.setQuestions} product_id={props.product_id} setQuestionModal={setQuestionModal}/>
      : null
      }
      <button onClick={() => {
        // BlurToggle();
        setQuestionModal(true);
      }}>Add a question</button>
    </>
  )
}

export default AddQuestion;