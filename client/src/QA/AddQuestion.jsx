import React, {useState} from "react";

const AddQuestion = (props) => {

  const [text, setText] = useState ('');

  return (
    <>
      <input type={text} placeholder="temporary input" onChange={(e) => {
        setText(e.target.value);
      }}/>
      <button onClick={() => {
        const newQuestions = props.questions.slice();
        newQuestions.push({text, answers: []});
        props.setQuestions(newQuestions);
      }}>Add a question</button>
    </>
  )

}

export default AddQuestion;