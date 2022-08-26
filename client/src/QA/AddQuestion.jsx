import React, {useState} from "react";

const AddQuestion = (props) => {

  const [text, setText] = useState ('');

  return (
    <>
      <input type={text} placeholder="temporary input" onChange={(e) => {
        setText(e.target.value);
      }}/>
      <button onClick={() => {
        const questions = props.questions;
        questions.push({text, answers: []});
        console.log('questions', questions);
        props.setQuestions(questions);
      }}>Add a question</button>
    </>
  )

}

export default AddQuestion;