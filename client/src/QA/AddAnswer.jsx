import React, {useState} from "react";
import BlurToggle from "../Shared/BlurToggle.jsx";
import AnswerModal from "./AnswerModal.jsx";

const AddAnswer = (props) => {

  const [answerModal, setAnswerModal] = useState(false);

  return (
    <>
      {answerModal
      ? <AnswerModal question={props.question} product_id={props.product_id} initialAnswerHelpfulness={props.initialAnswerHelpfulness} setInitialAnswerHelpfulness={props.setInitialAnswerHelpfulness} setQuestions={props.setQuestions} productName={props.productName}/>
      : null
      }
      <a href="#" onClick={() => {
        setAnswerModal(true);
      }}>Add Answer</a>
    </>
  )
}

export default AddAnswer;