import React, {useState} from "react";

const AddQuestion = (props) => {

  const [text, setText] = useState ('');

  return (
    <>
      <input type={text} placeholder="temporary input" onChange={(e) => {
        setText(e.target.value);
        console.log(text);
      }}/>
      <button onClick={() => {
        props.setQuestions([{text: 'testing!', answers: ['answertesting']}]);
      }}>Add a question</button>
    </>
  )

}

export default AddQuestion;