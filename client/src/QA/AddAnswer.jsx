import React, {useState} from "react";
import AnswerModal from "./AnswerModal.jsx";

const AddAnswer = (props) => {

  const [answerModal, setAnswerModal] = useState(false);

  return (
    <>
      {answerModal
      ? <AnswerModal question={props.question} product_id={props.product_id} initialAnswerHelpfulness={props.initialAnswerHelpfulness} setInitialAnswerHelpfulness={props.setInitialAnswerHelpfulness} setQuestions={props.setQuestions} productName={props.productName} setAnswerModal={setAnswerModal}/>
      : null
      }
      <a href='#' onClick={(e) => {
        e.preventDefault();
        setAnswerModal(true);
      }}>Add Answer</a>
    </>
  )
}

export default AddAnswer;