import React, {useState} from "react";

const AddQuestion = (props) => (
  <button onClick={() => {
    props.setQuestions([{text: 'testing!', answers: ['answertesting']}]);
  }}>Add a question</button>
)

export default AddQuestion;