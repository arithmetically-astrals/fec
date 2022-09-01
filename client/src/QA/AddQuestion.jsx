import React, {useState} from "react";
import axios from "axios";
import BlurToggle from "../Shared/BlurToggle.jsx";
import QuestionModal from "./QuestionModal.jsx";

const AddQuestion = (props) => {

  // const [body, setBody] = useState('');
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  const [questionModal, setQuestionModal] = useState(false);
  // const [emptyBody, setEmptyBody] = useState(false);
  // const [emptyName, setEmptyName] = useState(false);
  // const [emptyEmail, setEmptyEmail] = useState(false);
  // const [invalidEmail, setInvalidEmail] = useState(false);

  return (
    <>
      {questionModal
      ? <QuestionModal />
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